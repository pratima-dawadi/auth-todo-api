import { JwtPayload, verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";

/**
 * The function `auth` checks for a valid Bearer token in the request headers for authentication.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Callback Function
 * @returns Return an error message if the token is invalid or missing. Otherwise, it will call the next middleware.
 */
export function auth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new Error("Unauthorized"));
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new Error("Unauthorized"));

    return;
  }

  try {
    const details = verify(token[1], config.jwt.secret!);
    next();
  } catch (error) {
    next(new Error("Unauthorized"));
  }
}
