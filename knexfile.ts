import type { Knex } from "knex";
import "dotenv/config";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  // development: {
  //   client: "sqlite3",
  //   connection: {
  //     filename: "./dev.sqlite3",
  //   },
  // },

  development: {
    client: "mysql",
    version: "5.7",
    connection: {
      host: process.env.DB_HOSTNAME as string,
      port: Number(process.env.DB_PORT as string),
      user: process.env.DB_USERNAME as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_NAME as string,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_prod_migrations",
    },
  },
};

module.exports = config;
