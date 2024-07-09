import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("transactions", function (table) {
    table.increments("id").primary();
    table.uuid("uuid").defaultTo(knex.raw("(UUID())")).notNullable().unique();
    table.integer("payer-id").notNullable();
    table.integer("payee-id");
    table.double("amount", 14, 2).notNullable().defaultTo(0);
    table.boolean("settled").notNullable().defaultTo(false);
    table.text("description").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("transactions");
}
