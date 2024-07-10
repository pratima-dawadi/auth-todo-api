import { Request, Response } from "express";
import { listTodos } from "../model/todo.model";

import {
  checkId,
  createTodos,
  removeTodos,
  updateTodos,
} from "../service/todo.service";

/**
 * Get all todos.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
export function getTodos(req: Request, res: Response) {
  const user_id = req.user_id!;
  const data = listTodos(user_id);
  res.json(data);
}

/**
 * The function `getTodosById` retrieves todos by id for a specific user.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
export function getTodosById(req: Request, res: Response) {
  const { id } = req.params;
  const user_id = req.user_id!;
  const data = checkId(id, user_id);
  res.json(data);
}

/**
 * The function `postTodos` creates a new todo item with the provided data and associates it with a specific user.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns Return an error message id required fields are missing. Otherwise, it will create a new todo using the provided data, and return Json Response.
 */
export function postTodos(req: Request, res: Response) {
  const { body } = req;
  if (!body.name || !body.description || !body.status) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const user_id = req.user_id!;
  createTodos(body, user_id);
  res.json(body);
}

/**
 * The function `putTodos` updates a todo item with the provided data.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns Return an error message if the todo item is not found. Otherwise, it will update the todo item with the provided data and return a Json Response.
 */
export function putTodos(req: Request, res: Response) {
  const id = req.params.id;
  const { body } = req;
  const user_id = req.user_id!;
  const updatedData = updateTodos(id, body, user_id);

  if (updatedData.hasOwnProperty("error")) {
    return res.status(404).json(updatedData);
  }

  res.send(`Updated todo: ${JSON.stringify(body)}`);
}

/**
 * The function `deleteTodos` deletes a todo item by id.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns Return an error message if the todo item is not found. Otherwise, it will delete the todo item and return a Json Response.
 */
export function deleteTodos(req: Request, res: Response) {
  const { id } = req.params;
  const user_id = req.user_id!;
  const deletedTodo = removeTodos(Number(id), user_id);

  if (deletedTodo.hasOwnProperty("error")) {
    return res.status(404).json(deletedTodo);
  }

  res.send(`Deleted todo: ${JSON.stringify(deletedTodo)}`);
}
