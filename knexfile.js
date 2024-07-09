const dotenv = require("dotenv");
const { Knex } = require("knex");

dotenv.config();

// Update with your config settings.

const config = {
  client: "mysql",
  version: "5.7",
  connection: {
    host: process.env.DB_HOSTNAME,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

module.exports = config;
