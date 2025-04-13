// src/index.js

require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const jwt = require("jsonwebtoken");

// Sequelize setup
const sequelize = require("./config/database");

// Models
const Institute = require("./models/Institute");
const Student = require("./models/Student");
const Course = require("./models/Course");
const Result = require("./models/Result");

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const authenticate = require("./middleware/authenticate");

const app = express();

app.use(authenticate);

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(
  "/graphql",
  graphqlHTTP((req, res) => ({
    schema,
    graphiql: true,
    context: { user: req.user, res },
  }))
);

app.get("/", (req, res) => {
  res.send("Welcome to the GraphQL API");
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Database synced");
    const PORT = process.env.APP_PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}/graphql`);
    });
  })
  .catch((err) => {
    console.error("❌ Unable to sync database:", err);
  });
