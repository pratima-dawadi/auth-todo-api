import { Knex } from "knex";

const TABLE_NAME = "todos";

/**
 * Delete existing entries and seed values for table todos.
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
          title: "First Todo",
          description: "This is the first todo",
          status: "completed",
          user_id: "3",
        },
        {
          title: "Second Todo",
          description: "This is the second todo",
          status: "incomplete",
          user_id: "3",
        },
      ]);
    });
}
