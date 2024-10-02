export const techPrompts = [
    {
      type: "checkbox",
      name: "technologies",
      message: "Select the technologies you need:",
      choices: [
        { name: "Express.js", value: "express" },
        { name: "GraphQL", value: "graphql" },
        { name: "SQL (e.g., MySQL, PostgreSQL)", value: "sql" },
        { name: "MongoDB", value: "mongodb" },
        { name: "Prisma ORM", value: "prisma" },
        { name: "TypeScript", value: "typescript" },
        { name: "Nodemon (for auto-restarting the app)", value: "nodemon" },
      ],
    },
  ];
  
  export const additionalPackagesPrompts = [
    {
      type: "checkbox",
      name: "additionalPackages",
      message: "Would you like to install additional packages?",
      choices: [
        { name: "body-parser", value: "body-parser" },
        { name: "dotenv", value: "dotenv" },
        { name: "cors", value: "cors" },
        { name: "jsonwebtoken (JWT)", value: "jsonwebtoken" },
      ],
    },
  ];
  