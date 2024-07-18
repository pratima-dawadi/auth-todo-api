import { todo } from "node:test";
import { ITodos } from "../interfaces/todo.interfaces";
import { BaseModel } from "./base.model";

export class TodoModel extends BaseModel {
  /**
   * The function `createTodo` creates a new todo item in the database for a specific user.
   * @param {ITodos} todo - The `todo` parameter is an object that represents a todo item and has the
   * following properties:
   * @param {string} userid - The `userid` parameter in the `createTodo` function is a string that
   * represents the user ID of the user for whom the todo is being created. This user ID is used to
   * associate the todo with the specific user in the database.
   */
  static async createTodo(todo: ITodos, userid: string) {
    const todoToCreate = {
      title: todo.name,
      description: todo.description,
      status: todo.status,
      userId: userid,
    };
    await this.queryBuilder().insert(todoToCreate).into("todos");
  }

  /**
   * function updateTodo -updates a todo item in a database
   * @param {number} id - represents the unique identifier of the todo item
   * @param {ITodos} todo - represents todo object with properties (name, description, status)
   * @param {string} userId - represents the unique identifier of the user who owns the todo item
   * @returns return the updated todo data
   */
  static async updateTodo(id: number, todo: ITodos, userId: string) {
    const todoToUpdate = {
      title: todo.name,
      description: todo.description,
      status: todo.status,
      userId: +userId,
      updatedAt: new Date(),
    };

    const updateQuery = this.queryBuilder()
      .update(todoToUpdate)
      .into("todos")
      .where({ id });

    const updateResult = await updateQuery;

    if (updateResult) {
      const resultQuery = this.queryBuilder()
        .select("title", "description", "status")
        .table("todos")
        .where({ id });
      const data = await resultQuery;
      return data;
    }
  }

  /**
   * function deleteTodo -deletes a todo item based on its ID and user ID, and then retrieves the deleted items
   * @param {number} id - unique identifier of the todo item that you want to delete from the database.
   * @param {string} userId - string representing the user ID of the user who is attempting to delete a todo item.
   * @returns the data of the todo item that was deleted.
   */
  static async deleteTodo(id: number, userId: string) {
    const delUserId = +userId;
    const query = this.queryBuilder()
      .delete()
      .table("todos")
      .where({ id: id, user_id: delUserId });

    if (query) {
      const resultQuery = this.queryBuilder()
        .select("title", "description", "status")
        .table("todos")
        .where({ id });
      const data = await resultQuery;
      return data;
    }
  }

  /**
   * The function `getTodos` retrieves todos for a specific user based on their user ID.
   * @param {string} userId - The `userId` parameter in the `getTodos` function is a string representing
   * the user ID for which the todos are being fetched.
   * @returns The `getTodos` method is returning a list of todos for a specific user, identified by the
   * `userId` parameter.
   */
  static async getTodos(userId: string) {
    const query = this.queryBuilder()
      .select("*")
      .table("todos")
      .where({ user_id: +userId });
    const todos = await query;
    return todos;
  }

  static async getTodosById(id: string, userId: string) {
    const query = this.queryBuilder()
      .select("*")
      .table("todos")
      .where({ id: +id, user_id: +userId });
    const todos = await query;
    return todos;
  }
}

const todolist = [];
