import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("users", function (table) {
    table.uuid("uuid").defaultTo(knex.raw("(UUID())")).notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("users", function (table) {
    table.dropColumn("uuid");
  });
}
