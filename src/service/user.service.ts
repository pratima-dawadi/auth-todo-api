import { getUserQuery, User } from "../interfaces/user.interfaces";
import * as UserModel from "../model/user.model";
import bcrypt from "bcrypt";

/**
 * The function `getUserById` retrieves user data by ID and returns an error message if the user is not found.
 * @param {string} id - user id
 * @returns Return an error message if the user is not found. Otherwise, it will return the user data.
 */
export function getUserById(id: string) {
  const data = UserModel.getUserById(id);

  if (!data) {
    return {
      error: `User with id ${id} not found`,
    };
  }
  return data;
}

/**
 * The function `createUser` creates a new user with the provided data.
 * @param {User} user - The `user` parameter is an object that contains the details of the user to be created.
 * @returns Return an error message if required fields are missing. Otherwise, it will create a new user using the provided data.
 */
export async function createUser(user: User) {
  const password = await bcrypt.hash(user.password, 10);
  user.password = password;
  UserModel.createUser(user);
  return user;
}

/**
 * The function `getUsers` retrieves users based on the provided query using the UserModel.
 * @param {getUserQuery} query - getUserQuery
 * @returns Return a list of users based on the query.
 */
export function getUsers(query: getUserQuery) {
  return UserModel.getUsers(query);
}

/**
 * The function `getUserByEmail` retrieves user data based on the provided email address.
 * @param {string} email - email address
 * @returns Return the user data based on the email address.
 */
export function getUserByEmail(email: string) {
  const data = UserModel.getUserByEmail(email);
  return data;
}
