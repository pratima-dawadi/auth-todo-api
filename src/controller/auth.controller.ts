import { NextFunction, Request, Response } from "express";
import * as AuthService from "../service/auth.service";
import loggerWithNameSpace from "../utils/logger";
import { ForbiddenError } from "../error/ForbiddenError";
import { BadRequestError } from "../error/BadRequestError";

const logger = loggerWithNameSpace("AuthController");

/**
 * Handles user login.
 * @param {Request} req - Request object.
 * @param {Response} res - Response object.
 */
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    const data = await AuthService.login(body);
    logger.info(`User login attempt for ${body.email}`);
    if (!data) throw new BadRequestError("Invalid email or password");
    res.json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * Generate a new access token using the refresh token.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new BadRequestError("Missing refresh token");
    }
    const data = await AuthService.refreshToken(refreshToken);
    logger.info(`Refresh token request for ${refreshToken}`);
    if (!data) {
      throw new ForbiddenError("Invalid refresh token");
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
}
