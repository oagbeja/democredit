import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("wallets", function (table) {
    table.integer("user_id").unsigned().notNullable().alter();
    table.dropForeign(["user_id"]);
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("wallets", function (table) {
    table.dropForeign("user_id");
    table.integer("user_id").unsigned().notNullable().alter();
  });
}
