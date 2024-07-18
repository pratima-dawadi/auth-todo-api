import { Knex } from "knex";

const TABLE_NAME = "users";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          name: "admin",
          email: "admin@gmail.com",
          password:
            "$2b$10$zI1TAgx2pBlmEHL3fAAbLuDpJLvn1SyJ70I0na/p4.WFO.EAw7pUe",
        },
      ]);
    });
}
