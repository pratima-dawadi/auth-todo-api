import { Response } from "express";
import { Request } from "../interfaces/auth.interfaces";
import { listTodos } from "../model/todo.model";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("TodoController");

import {
  checkId,
  createTodos,
  removeTodos,
  updateTodos,
} from "../service/todo.service";
import { log } from "console";

/**
 * Get all todos.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
export function getTodos(req: Request, res: Response) {
  const user_id = req.user!.id;
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
  const user_id = req.user!.id;
  const data = checkId(id, user_id);
  logger.info(`User ${user_id} requested todo with id ${id}`);
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
  const user_id = req.user!.id;
  createTodos(body, user_id);
  logger.info(`User ${user_id} created a new todo ${body.name}`);
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
  const user_id = req.user!.id;
  const updatedData = updateTodos(id, body, user_id);
  
  if (updatedData.hasOwnProperty("error")) {
    return res.status(404).json(updatedData);
  }
  
  logger.info(`User ${user_id} updated todo of id ${id}`);
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
  const user_id = req.user!.id;
  const deletedTodo = removeTodos(Number(id), user_id);
  
  if (deletedTodo.hasOwnProperty("error")) {
    return res.status(404).json(deletedTodo);
  }
  
  logger.info(`User ${user_id} deleted todo of id ${id}`);
  res.send(`Deleted todo: ${JSON.stringify(deletedTodo)}`);
}
