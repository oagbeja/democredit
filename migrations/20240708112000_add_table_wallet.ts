import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("wallets", function (table) {
    table.increments("id").primary();
    table.uuid("uuid").defaultTo(knex.raw("(UUID())")).notNullable().unique();
    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE"); // Assuming the referenced table is 'users'
    table.double("amount", 14, 2).notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("wallets");
}
