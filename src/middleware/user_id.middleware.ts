import { Request, Response, NextFunction } from "express";
import config from "../config";
import { verify, JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user_id?: string;
  }
}

/**
 * The function `authenticateToken` checks for the presence of an authorization token in the request
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Callback Function
 * @returns Return an error message if the token is invalid or missing. Otherwise, it will call the next middleware.
 */
export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const details = verify(token, config.jwt.secret!) as JwtPayload;
    req.user_id = details.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
