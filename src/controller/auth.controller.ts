import { Request, Response } from "express";
import * as AuthService from "../service/auth.service";

/**
 * Handles user login.
 * @param {Request} req - Request object.
 * @param {Response} res - Response object.
 */
export async function login(req: Request, res: Response) {
  try {
    const { body } = req;
    const data = await AuthService.login(body);
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: "Invalid credentials",
    });
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
      return res.status(400).json({ error: "Refresh token is required" });
    }

    const data = await AuthService.refreshToken(refreshToken);

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: "Invalid refresh token" });
  }
}
