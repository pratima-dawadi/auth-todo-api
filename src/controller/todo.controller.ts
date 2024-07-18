import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth.interfaces";
import loggerWithNameSpace from "../utils/logger";
import * as TodoModel from "../model/todo.model";

const logger = loggerWithNameSpace("TodoController");

import {
  checkId,
  createTodos,
  removeTodos,
  updateTodos,
} from "../service/todo.service";
import { log } from "console";
import { BadRequestError } from "../error/BadRequestError";
import { ForbiddenError } from "../error/ForbiddenError";

/**
 * Get all todos.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
export async function getTodos(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user_id = req.user!.id;
    const data = await TodoModel.TodoModel.getTodos(user_id);
    if (!data) {
      throw new BadRequestError("No todos found for this user");
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * The function `getTodosById` retrieves todos by id for a specific user.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
export async function getTodosById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const user_id = req.user!.id;
    const data = await checkId(id, user_id);
    if (!data) {
      throw new BadRequestError(`Todo with id ${id} not found`);
    }
    logger.info(`User ${user_id} requested todo with id ${id}`);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * The function `postTodos` creates a new todo item with the provided data and associates it with a specific user.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns Return an error message id required fields are missing. Otherwise, it will create a new todo using the provided data, and return Json Response.
 */
export function postTodos(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    if (!body.name || !body.description || !body.status) {
      throw new BadRequestError("Missing required fields");
    }
    const user_id = req.user!.id;
    const data = createTodos(body, user_id);
    if (!data) {
      throw new ForbiddenError("Task cannot be created");
    }
    logger.info(`User ${user_id} created a new todo ${body.name}`);

    res.json(body);
  } catch (error) {
    next(error);
  }
}

/**
 * The function `putTodos` updates a todo item with the provided data.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns Return an error message if the todo item is not found. Otherwise, it will update the todo item with the provided data and return a Json Response.
 */
export function putTodos(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const { body } = req;
    const user_id = req.user!.id;
    const updatedData = updateTodos(id, body, user_id);
    if (!updatedData) {
      throw new BadRequestError(`Todo with id ${id} not found`);
    }

    logger.info(`User ${user_id} updated todo of id ${id}`);
    res.send(`Updated todo: ${JSON.stringify(body)}`);
  } catch (error) {
    next(error);
  }
}

/**
 * The function `deleteTodos` deletes a todo item by id.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns Return an error message if the todo item is not found. Otherwise, it will delete the todo item and return a Json Response.
 */
export async function deleteTodos(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const user_id = req.user!.id;
    const deletedTodo = await removeTodos(Number(id), user_id);
    if (!deletedTodo) {
      throw new BadRequestError(`Todo with id ${id} not found`);
    }

    logger.info(`User ${user_id} deleted todo of id ${id}`);
    res.send(`Deleted todo: ${JSON.stringify(deletedTodo)}`);
  } catch (error) {
    next(error);
  }
}
