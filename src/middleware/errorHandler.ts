import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth.interfaces";
import HTTPStatusCodes from "http-status-codes";
import { UnauthenthicatedError } from "../error/UnauthenticatedError";
import { BadRequestError } from "../error/BadRequestError";
import { ForbiddenError } from "../error/ForbiddenError";

import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("ErrorHandler");

export function notFoundError(req: Request, res: Response) {
  return res.status(HTTPStatusCodes.NOT_FOUND).json({
    message: "Not Found",
  });
}

export function genericErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.stack) {
    logger.error(error.stack);
  }

  if (error instanceof UnauthenthicatedError) {
    return res.status(HTTPStatusCodes.UNAUTHORIZED).json({
      message: error.message,
    });
  }

  if (error instanceof BadRequestError) {
    return res.status(HTTPStatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }

  if (error instanceof ForbiddenError) {
    return res.status(HTTPStatusCodes.FORBIDDEN).json({
      message: error.message,
    });
  }

  return res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
  });
}
