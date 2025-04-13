const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

module.exports = sequelize;

// PORT=4000
// DB_NAME=your_db
// DB_USER=your_user
// DB_PASS=your_pass
// DB_HOST=localhost
// JWT_SECRET=supersecretkey
