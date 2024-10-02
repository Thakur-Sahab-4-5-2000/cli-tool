import fs from "fs";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process"; 

export const setupDatabase = (techAnswers, projectPath) => {
  if (techAnswers.technologies.includes("prisma")) {
    const prismaFileContent = `
module.exports = {
  // Prisma schema
  datasource: {
    provider: "sqlite", // or "postgresql" / "mysql"
    url: "file:./dev.db" // Change this to your database URL
  },
  generator: {
    provider: "prisma-client-js"
  },
  // Define your models here
};
`;
    fs.writeFileSync(path.join(projectPath, "prisma.js"), prismaFileContent);
    console.log(chalk.green("Created prisma.js configuration file."));
  }

  if (techAnswers.technologies.includes("sql")) {
    const sqlFileContent = `
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql' // or 'postgres', etc.
});

module.exports = sequelize;
`;
    fs.writeFileSync(path.join(projectPath, "sql.js"), sqlFileContent);
    console.log(chalk.green("Created sql.js configuration file."));
  }

  if (techAnswers.technologies.includes("mongodb")) {
    const mongoFileContent = `
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
`;
    fs.writeFileSync(path.join(projectPath, "mongodb.js"), mongoFileContent);
    console.log(chalk.green("Created mongodb.js configuration file."));
  }

  // If TypeScript is selected, initialize TypeScript configuration
  if (techAnswers.technologies.includes("typescript")) {
    console.log(chalk.blue("Setting up TypeScript..."));
    execSync(`npx tsc --init`, { cwd: projectPath, stdio: "inherit" });
    console.log(chalk.green("TypeScript configuration initialized!"));
  }
};
