const { Sequelize } = require("sequelize");
const config = require("./config"); // Import the config.js file
require("dotenv").config();

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    port: config.development.port,
    logging: false,
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;

// DB_PORT=5432
// DB_NAME=postgres_new2
// DB_USER=root
// DB_PASS=123
// DB_HOST=localhost
// JWT_SECRET=supersecretkey
// APP_PORT=5000
