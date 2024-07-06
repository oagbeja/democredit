import Knex from "knex";

const knex = Knex({
  client: "mysql",
  version: "5.7",
  connection: {
    host: process.env.DB_HOSTNAME as string,
    port: Number(process.env.DB_PORT as string),
    user: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
  },
  migrations: {
    tableName: "migrations",
  },
});

export default knex;
