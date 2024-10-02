import fs from "fs";
import path from "path";
import chalk from "chalk";

export const setupServer = (techAnswers, projectPath) => {
  const serverPath = path.join(projectPath, "server");
  fs.mkdirSync(serverPath, { recursive: true });
  fs.mkdirSync(path.join(serverPath, "controllers"));
  fs.mkdirSync(path.join(serverPath, "models"));
  console.log(
    chalk.green(
      "Created controllers and models directories inside the server folder."
    )
  );

  let indexJsContent = `
const express = require('express');
const app = express();
`;

  // Express only setup
  if (
    techAnswers.technologies.includes("express") &&
    !techAnswers.technologies.includes("graphql")
  ) {
    indexJsContent += `
app.get('/', (req, res) => res.send('Hello from Express!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Express server is running on port ' + PORT);
});
`;
  }

  // GraphQL only setup
  if (
    techAnswers.technologies.includes("graphql") &&
    !techAnswers.technologies.includes("express")
  ) {
    indexJsContent += `
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql\`
  type Query {
    hello: String
  }
\`;

const resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log('GraphQL server ready at http://localhost:' + PORT);
});
`;
  }

  // Both Express and GraphQL setup
  if (
    techAnswers.technologies.includes("express") &&
    techAnswers.technologies.includes("graphql")
  ) {
    indexJsContent += `
const { ApolloServer, gql } = require('apollo-server-express');
const bodyParser = require('body-parser');

// Basic Express route
app.get('/', (req, res) => res.send('Hello from Express!'));

// GraphQL setup
const typeDefs = gql\`
  type Query {
    hello: String
  }
\`;

const resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Express server running on port ' + PORT);
  console.log('🚀 GraphQL ready at http://localhost:' + PORT + server.graphqlPath);
});
`;
  }

  fs.writeFileSync(path.join(serverPath, "index.js"), indexJsContent);
  console.log(chalk.green("Created server/index.js file."));
};
