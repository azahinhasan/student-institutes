require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");

// Sequelize setup
const sequelize = require("./config/database");

// Models
const Institute = require("./models/Institute");
const Student = require("./models/Student");
const Course = require("./models/Course");
const Result = require("./models/Result");

const typeDefs = require("./graphql/schemas");
const resolvers = require("./graphql/resolvers");

const authenticate = require("./middleware/authenticate");

const app = express();

app.use(express.json());

app.use(authenticate);

const schema = makeExecutableSchema({ typeDefs, resolvers });
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Database synced");
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}/graphql`);
    });
  })
  .catch((err) => {
    console.error("❌ Unable to sync database:", err);
  });
