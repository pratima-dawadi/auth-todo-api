import { getUserQuery, User } from "../interfaces/user.interfaces";
import * as UserModel from "../model/user.model";
import bcrypt from "bcrypt";

export function getUserById(id: string) {
  const data = UserModel.getUserById(id);

  if (!data) {
    return {
      error: `User with id ${id} not found`,
    };
  }
  return data;
}

export async function createUser(user: User) {
  const password = await bcrypt.hash(user.password, 10);
  user.password = password;
  UserModel.createUser(user);
  return user;
}

export function getUsers(query: getUserQuery) {
  return UserModel.getUsers(query);
}

export function getUserByEmail(email: string) {
  const data = UserModel.getUserByEmail(email);
  return data;
}
