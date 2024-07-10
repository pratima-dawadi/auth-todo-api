import bcrypt from "bcrypt";

import { User } from "../interfaces/user.interfaces";
import { getUserByEmail } from "../model/user.model";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import config from "../config";
import { error } from "console";
import { permission } from "process";

/**
 * The function `login` hverify credentials and generate access and refresh tokens upon successful login.
 * @param body - Users credentials
 * @returns Return an error message if the email or password is invalid. Otherwise, it will generate an access token and a refresh token.
 */
export async function login(body: Pick<User, "email" | "password">) {
  const existingUser = getUserByEmail(body.email);
  if (!existingUser) {
    return {
      error: "Invalid email",
    };
  }

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  if (!isValidPassword) {
    return {
      error: "Invalid password",
    };
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    permission: existingUser.permission,
  };

  const acessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const refreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });

  return {
    acessToken,
    refreshToken,
  };
}

/**
 * The function refreshToken takes an old refresh token, verifies it, and generates a new access token if the old refresh token is valid.
 * @param {string} oldRefreshToken - OldRefreshToken
 * @returns Return an error message if the refresh token is invalid. Otherwise, it will generate a new access token.
 */
export function refreshToken(oldRefreshToken: string) {
  if (!oldRefreshToken) {
    return {
      error: "Refresh token is required",
    };
  }

  const payload = verify(oldRefreshToken, config.jwt.secret!) as JwtPayload;

  if (!payload || !payload.id || !payload.email || !payload.name) {
    return { error: "Invalid refresh token" };
  }

  const newPayload: Pick<User, "id" | "name" | "email"> = {
    id: payload.id,
    name: payload.name,
    email: payload.email,
  };

  const accessToken = sign(newPayload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  return {
    accessToken,
  };
}
