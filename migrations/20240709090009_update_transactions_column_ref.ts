import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("transactions", function (table) {
    table.integer("payer_id").unsigned().notNullable().alter();
    table.dropForeign(["payer_id"]);
    table.foreign("payer_id").references("id").inTable("users");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("transactions", function (table) {
    table.dropForeign("payer_id");
    table.integer("payer_id").unsigned().notNullable().alter();
  });
}
