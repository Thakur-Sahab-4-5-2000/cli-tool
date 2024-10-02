import { execSync } from "child_process";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { installPackages } from "./installPackages.js";
import { setupServer } from "./setupServer.js";
import { setupDatabase } from "./setupDatabase.js";
import { techPrompts, additionalPackagesPrompts } from "./prompts.js";

const CURRENT_DIR = process.cwd();

export const createProject = async (projectName) => {
  const projectPath = path.join(CURRENT_DIR, projectName);

  // Check if project folder already exists
  if (fs.existsSync(projectPath)) {
    console.error(chalk.red(`Project ${projectName} already exists.`));
    process.exit(1);
  }

  // Create project folder
  fs.mkdirSync(projectPath);
  fs.writeFileSync(path.join(projectPath, "README.md"), `# ${projectName}`);
  console.log(chalk.green(`Project ${projectName} created successfully!`));

  // Initialize npm in the project
  execSync(`cd ${projectPath} && npm init -y`, { stdio: "inherit" });

  // Ask user to select the technologies
  const techAnswers = await inquirer.prompt(techPrompts);
  
  // Handle technology-specific logic
  if (techAnswers.technologies.includes("prisma")) {
    techAnswers.technologies = techAnswers.technologies.filter(
      (tech) => tech !== "sql" && tech !== "mongodb"
    );

    console.log(
      chalk.yellow("Note: Selecting Prisma ORM disables SQL and MongoDB options.")
    );
  }

  // Install selected packages
  await installPackages(techAnswers, projectPath);
  
  // Setup server
  setupServer(techAnswers, projectPath);

  // Setup database configuration
  setupDatabase(techAnswers, projectPath);

  console.log(chalk.green(`Project setup complete in ${projectPath}`));
};
