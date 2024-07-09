import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("transactions", function (table) {
    table.renameColumn("payer-id", "payer_id");
    table.renameColumn("payee-id", "payee_id");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("transactions", function (table) {
    table.renameColumn("payer_id", "payer-id");
    table.renameColumn("payee_id", "payee-id");
  });
}
