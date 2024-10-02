import { execSync } from "child_process";
import inquirer from "inquirer";
import chalk from "chalk";
import { additionalPackagesPrompts } from "./prompts.js";

const packages = {
  express: "express",
  graphql: "graphql express-graphql apollo-server-express",
  sql: "pg mysql2 sequelize",
  mongodb: "mongoose",
  prisma: "@prisma/client",
  typescript: "typescript @types/node ts-node",
  nodemon: "nodemon",
};

export const installPackages = async (techAnswers, projectPath) => {
  let packagesToInstall = [];

  // Add selected technologies to the install list
  for (const tech of techAnswers.technologies) {
    packagesToInstall.push(packages[tech]);
  }

  // Ask for additional packages
  const additionalPackagesAnswers = await inquirer.prompt(additionalPackagesPrompts);
  packagesToInstall.push(...additionalPackagesAnswers.additionalPackages);

  // If TypeScript is selected, ask for additional TypeScript utility packages
  if (techAnswers.technologies.includes("typescript")) {
    const typescriptPackagesAnswers = await inquirer.prompt([
      {
        type: "checkbox",
        name: "typescriptPackages",
        message:
          "Would you like to install additional TypeScript utility packages?",
        choices: [
          { name: "@types/express", value: "@types/express" },
          { name: "@types/node", value: "@types/node" },
          { name: "ts-node", value: "ts-node" },
        ],
      },
    ]);

    packagesToInstall.push(...typescriptPackagesAnswers.typescriptPackages);
  }

  // Install packages if any
  if (packagesToInstall.length > 0) {
    console.log(chalk.blue("Installing all selected packages..."));
    try {
      execSync(`npm install ${packagesToInstall.join(" ")}`, {
        cwd: projectPath,
        stdio: "inherit",
      });
      console.log(chalk.green("All packages installed successfully!"));
    } catch (error) {
      console.error(chalk.red("Error installing packages:", error.message));
    }
  } else {
    console.log(chalk.yellow("No packages selected for installation."));
  }
};
