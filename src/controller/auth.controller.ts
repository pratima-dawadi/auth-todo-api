import { Request, Response } from "express";
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
export async function login(req: Request, res: Response) {
  try {
    const { body } = req;
    const data = await AuthService.login(body);
    logger.info(`User login attempt for ${body.email}`);
    res.json(data);
  } catch (error) {
    res.status(400).json(new BadRequestError("Invalid email or password"));
  }
}

/**
 * Generate a new access token using the refresh token.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
export async function refreshToken(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json(new BadRequestError("Missing refresh token"));
    }
    const data = await AuthService.refreshToken(refreshToken);
    logger.info(`Refresh token request for ${refreshToken}`);

    res.json(data);
  } catch (error) {
    res.status(400).json(new BadRequestError("Invalid refresh token"));
  }
}
