import { Knex } from "knex";

const TABLE_NAME = "permissions";

/**
 * Delete existing entries and seed values for table permissions.
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
          user_id: 1,
          permission: "get.users",
        },
        {
          user_id: 1,
          permission: "update.users",
        },
        {
          user_id: 1,
          permission: "delete.todos",
        },
        {
          user_id: 1,
          permission: "create.todos",
        },
      ]);
    });
}
