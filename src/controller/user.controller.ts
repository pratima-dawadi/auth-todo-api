import { NextFunction, Request, Response } from "express";
import * as UserService from "../service/user.service";
import { getUserQuery } from "../interfaces/user.interfaces";
import loggerWithNameSpace from "../utils/logger";
import { BadRequestError } from "../error/BadRequestError";

const logger = loggerWithNameSpace("UserController");

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
export function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const data = UserService.getUserById(id);
    if (data.hasOwnProperty("error")) {
      throw new BadRequestError("User not found");
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * The function `createUser` creates a new user with the provided data.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns  Return an error message if required fields are missing. Otherwise, it will create a new user using the provided data, and return a Json Response.
 */
export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;

    if (!body.name || !body.email || !body.password) {
      throw new BadRequestError("Missing required fields");
    }

    const userExists = UserService.getUserByEmail(body.email);
    if (userExists) {
      throw new BadRequestError("User already exists");
    }

    const data = await UserService.createUser(body);
    logger.info(`User created with email ${body.email}`);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { body } = req;
    const data = UserService.updateUser(id, body);
    if (!data) {
      throw new BadRequestError("User not found");
    }
    logger.info(`User updated with id ${id}`);
    res.send(`Updated user: ${JSON.stringify(data)}`);
  } catch (error) {
    next(error);
  }
}

export function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const data = UserService.deleteUser(id);
    if (!data) {
      throw new BadRequestError("User not found");
    }
    logger.info(`User deleted with id ${id}`);
    res.send(`Deleted user: ${JSON.stringify(data)}`);
  } catch (error) {
    next(error);
  }
}
