import { ITodos } from "../interfaces/todo.interfaces";
import { getIdFromModel } from "../model/todo.model";
import * as TodoModel from "../model/todo.model";

/**
 * The function `checkId` checks if a todo with a specific id exists for a given user_id and returns an error message if not found.
 * @param {string} id - Id parameter
 * @param {string} user_id - User id
 * @returns Return an error message if the todo with the id is not found. Otherwise, it will return the todo id.
 */
export function checkId(id: string, user_id: string) {
  const todoId = getIdFromModel(id, user_id);

  if (!todoId) {
    return {
      error: `Todo with id ${id} not found`,
    };
  }

  return todoId;
}

/**
 * The function `createTodos` creates todos for a specific user based on the provided body and user ID.
 * @param {ITodos} body - The `body` parameter is an object that contains the details of the todo item to be created.
 * @param {string} user_id - User id
 */
export function createTodos(body: ITodos, user_id: string) {
  TodoModel.createTodos(body, user_id);
}

/**
 * The function `updateTodos` updates a todo item for a specific user and returns an error message if invalid.
 * @param {string} id - task id
 * @param {ITodos} body - contains the details of the todo item to be updated.
 * @param {string} user_id - User id
 * @returns Return an error message if the task does not belong to the user or is invalid. Otherwise, it will return the updated todo item.
 */
export function updateTodos(id: string, body: ITodos, user_id: string) {
  const updatedToDo = TodoModel.updateTodos(Number(id), body, user_id);
  if (updatedToDo.hasOwnProperty("error")) {
    return { error: "Task does not belong to the user or is invalid" };
  }
  return updatedToDo;
}

/**
 * The function `removeTodos` removes a todo item for a specific user and returns an error message if invalid.
 * @param {number} id - task id
 * @param {string} user_id - user id
 * @returns Return an error message if the task does not belong to the user or is invalid. Otherwise, it will return the deleted todo item.
 */
export function removeTodos(id: number, user_id: string) {
  const deletedTodo = TodoModel.deleteTodo(id, user_id);
  if (deletedTodo.hasOwnProperty("error")) {
    return { error: "Task does not belong to the user or is invalid" };
  }
  return deletedTodo;
}
