import { JwtPayload, verify } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth.interfaces";
import config from "../config";
import { User } from "../interfaces/user.interfaces";
import { UnauthenthicatedError } from "../error/UnauthenticatedError";
import { UserModel } from "../model/user.model";

/**
 * The function `auth` checks for a valid Bearer token in the request headers for authentication.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Callback Function
 * @returns Return an error message if the token is invalid or missing. Otherwise, it will call the next middleware.
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthenthicatedError("Unauthorized"));
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new UnauthenthicatedError("Token not found"));

    return;
  }

  try {
    const user = verify(token[1], config.jwt.secret!) as User;
    req.user = user;
    next();
  } catch (error) {
    next(new UnauthenthicatedError("Token not valid"));
  }
}

export function authorize(permissions: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    try {
      const userPermissions = await UserModel.getUserPermissions(user.id);
      const permissionsArray = userPermissions.map(
        (perm: { permission: string }) => perm.permission
      );

      if (!permissionsArray.includes(permissions)) {
        return next(new UnauthenthicatedError("Permission denied"));
      }

      next();
    } catch (error) {
      return next(new Error("Failed to authorize user"));
    }
  };
}
