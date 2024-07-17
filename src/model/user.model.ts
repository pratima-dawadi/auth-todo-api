import { BadRequestError } from "../error/BadRequestError";
import { getUserQuery, User } from "../interfaces/user.interfaces";
import { BaseModel } from "./base.model";

export class UserModel extends BaseModel {
  static async createUser(user: User) {
    const userToCreate = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    await this.queryBuilder().insert(userToCreate).into("users");
  }

  static async updateUser(id: string, user: User) {
    const userToUpdate = {
      name: user.name,
      email: user.email,
      password: user.password,
      updatedAt: new Date(),
    };
    const query = this.queryBuilder()
      .update(userToUpdate)
      .into("users")
      .where({ id });

    if (query) {
      const resultQuery = this.queryBuilder()
        .select("id", "email", "password")
        .table("users")
        .where({ id });
      const data = await resultQuery;
      console.log(`updated data:${data}`);
      return data;
    }
  }

  static async getUsers(filter: getUserQuery) {
    const { q } = filter;
    const query = this.queryBuilder()
      .select("id", "name", "email")
      .table("users");
    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    const user = await query;
    return user;
  }
  static async count(filter: getUserQuery) {
    const { q } = filter;
    const query = this.queryBuilder().count("*").table("users").first();
    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    const user = await query;
    return user;
  }

  static async getallUsers(filter: getUserQuery) {
    const query = this.queryBuilder().select("*").table("users");
    const user = await query;
    return user;
  }

  static async deleteUsers(id: string) {
    const query = this.queryBuilder().delete().table("users").where({ id: id });
    if (query) {
      const resultQuery = this.queryBuilder()
        .select("id", "email", "password")
        .table("users")
        .where({ id });
      const data = await resultQuery;
      console.log(`updated data:${data}`);
      return data;
    }
  }
}

export const users: User[] = [
  {
    name: "abcd",
    email: "abcd@gmail.com",
    password: "$2b$10$sGjlIiRRwWY7B.0zietgNuY194/lo61u42U/CGyZr66sUS16wgr5m",
    permission: [
      "get.users",
      "create.users",
      "update.users",
      "delete.users",
      "get.userByQuery",
      "get.usersById",
      "get.todos",
      "create.todos",
      "update.todos",
      "delete.todos",
    ],
    id: "1",
  },
];

/**
 * The function `getUserById` retrieves a user object from an array based on the provided user ID.
 * @param {string} id - user id
 * @returns Return a user object if found
 */
export function getUserById(id: string) {
  return users.find(({ id: userId }) => userId === id);
}

/**
 * The function `createUser` adds a new user to an array with an incremented ID.
 * @param {User} user - User object containing user details
 * @returns Return the newly created user object
 */
export function createUser(user: User) {
  return users.push({
    ...user,
    permission: [
      "get.todos",
      "create.todos",
      "update.todos",
      "delete.todos",
      "get.todosById",
    ],
    id: `${users.length + 1}`,
  });
}

/**
 * The function `getUsers` filters an array of users based on a query parameter.
 * @param {getUserQuery} query - getUserQuery
 * @returns Return a list of users based on the query
 */
export function getUsers(query: getUserQuery) {
  const { q } = query;
  if (q) {
    return users.filter(({ name }) => name === q);
  }
  return users;
}

/**
 * The function `getUserByEmail` retrieves a user object from an array based on the provided email address.
 * @param {string} email - email address
 * @returns Return a user object if found
 */
export function getUserByEmail(email: string) {
  return users.find(({ email: userEmail }) => userEmail === email);
}

export function updateUser(id: string, body: User) {
  const userIndex = users.findIndex(({ id: userId }) => userId === id);
  if (userIndex === -1) {
    return { error: "User not found" };
  }
  users[userIndex] = {
    ...users[userIndex],
    ...body,
  };
  return users[userIndex];
}

export function deleteUser(id: string) {
  const userIndex = users.findIndex(({ id: userId }) => userId === id);
  if (userIndex === -1) {
    throw new BadRequestError("User not found");
  }
  return users.splice(userIndex, 1);
}

export function getUserByQuery(query: getUserQuery) {
  const { q } = query;
  if (q) {
    return users.filter(({ name }) => name === q);
  }
  return users;
}
