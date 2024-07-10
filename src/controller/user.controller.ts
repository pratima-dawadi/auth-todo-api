import { Request, Response } from "express";
import * as UserService from "../service/user.service";
import { getUserQuery } from "../interfaces/user.interfaces";

/**
 * the function `getUsers` retrieves all users.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
export function getUsers(
  req: Request<any, any, any, getUserQuery>,
  res: Response
) {
  const { query } = req;
  const data = UserService.getUsers(query);
  res.json(data);
}

/**
 * The function `getUserById` retrieves a user by id.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns Return a user object if found
 */
export function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  const data = UserService.getUserById(id);
  res.json(data);
}

/**
 * The function `createUser` creates a new user with the provided data.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns  Return an error message if required fields are missing. Otherwise, it will create a new user using the provided data, and return a Json Response.
 */
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

export function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { body } = req;
  const data = UserService.updateUser(id, body);
  res.send(`Updated user: ${JSON.stringify(data)}`);
}

export function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  const data = UserService.deleteUser(id);
  res.send(`Deleted user: ${JSON.stringify(data)}`);
}
