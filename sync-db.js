require("dotenv").config();
const { Client } = require("pg");
const sequelize = require("./config/database");

// Import all models to register them
require("./models/User");
require("./models/Institute");
require("./models/Student");
require("./models/Course");
require("./models/Result");

const createDatabaseIfNotExists = async () => {
  const dbName = process.env.DB_NAME;
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: "postgres",
  });

  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${dbName}'`
    );
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Database '${dbName}' created.`);
    } else {
      console.log(`ℹ️ Database '${dbName}' already exists.`);
    }
  } catch (err) {
    console.error("❌ Error checking/creating database:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
};

(async () => {
  await createDatabaseIfNotExists();

  try {
    await sequelize.sync({ alter: true });
    console.log("✅ All tables have been synced successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error syncing tables:", error);
    process.exit(1);
  }
})();
