#!/usr/bin/env node

import { Command } from "commander";
import { createProject } from "./createProject.js";

const program = new Command();

program
  .version("1.0.0")
  .description("A simple CLI to create a project template with a server setup")
  .argument("<project-name>", "Name of the project")
  .action(createProject);

program.parse(process.argv);
