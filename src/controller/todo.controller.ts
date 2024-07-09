import { Request, Response } from "express";
import { listTodos } from "../model/todo.model";
import config from "../config";
import { JwtPayload, verify } from "jsonwebtoken";
import {
  checkId,
  createTodos,
  removeTodos,
  updateTodos,
} from "../service/todo.service";

export function getTodos(req: Request, res: Response) {
  const user_id = req.user_id!;
  const data = listTodos(user_id);
  res.json(data);
}

export function getTodosById(req: Request, res: Response) {
  const { id } = req.params;
  const user_id = req.user_id!;
  const data = checkId(id, user_id);
  res.json(data);
}

export function postTodos(req: Request, res: Response) {
  const { body } = req;
  if (!body.name || !body.description || !body.status) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const user_id = req.user_id!;
  createTodos(body, user_id);
  res.json(body);
}

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

export function deleteTodos(req: Request, res: Response) {
  const { id } = req.params;
  const user_id = req.user_id!;
  const deletedTodo = removeTodos(Number(id), user_id);

  if (deletedTodo.hasOwnProperty("error")) {
    return res.status(404).json(deletedTodo);
  }

  res.send(`Deleted todo: ${JSON.stringify(deletedTodo)}`);
}
