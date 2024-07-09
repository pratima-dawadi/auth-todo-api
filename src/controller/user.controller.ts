import { Request, Response } from "express";
import * as UserService from "../service/user.service";
import { getUserQuery } from "../interfaces/user.interfaces";

export function getUsers(
  req: Request<any, any, any, getUserQuery>,
  res: Response
) {
  const { query } = req;
  const data = UserService.getUsers(query);
  res.json(data);
}

export function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  const data = UserService.getUserById(id);
  res.json(data);
}

export async function createUser(req: Request, res: Response) {
  const { body } = req;

  if (!body.name || !body.email || !body.password) {
    res.status(400).json({
      error: "Missing required fields",
    });
    return;
  }

  const userExists = UserService.getUserByEmail(body.email);
  if (userExists) {
    res.status(400).json({
      error: "User with email already exists",
    });
    return;
  }

  const data = await UserService.createUser(body);
  res.json(data);
}
