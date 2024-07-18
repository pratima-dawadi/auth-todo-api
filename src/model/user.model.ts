import { BadRequestError } from "../error/BadRequestError";
import { getUserQuery, User } from "../interfaces/user.interfaces";
import { BaseModel } from "./base.model";

export class UserModel extends BaseModel {
  /**
   * Function `createUser`- creates a new user in a database table and assigns permissions to the user for various actions
   * @param {User} user - responsible for creating a new userin a database along with setting permissions for that user
   */
  static async createUser(user: User) {
    const userToCreate = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    const query = await this.queryBuilder().insert(userToCreate).into("users");

    if (query) {
      const permissions = [
        "get.todos",
        "create.todos",
        "update.todos",
        "delete.todos",
      ];
      const userId = await this.queryBuilder()
        .select("id")
        .table("users")
        .where("email", user.email)
        .first();
      for (const permission of permissions) {
        await this.queryBuilder()
          .insert({ user_id: userId.id, permission: permission })
          .table("permissions");
      }
    }
  }

  /**
   * function 'updateUser -updates a user's information in a database table and returns the updated data
   * @param {string} id -  represents the unique identifier of the user that needs to be updated in the database
   * @param {User} user -  represents the updated user information
   * @returns Tthe data of the user that was updated in the database
   */
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
      return data;
    }
  }

  /**
 * This static async function retrieves users based on a specified filter query.
 * @param {getUserQuery} filter - contains a property `q` which is used to filter users based on a search query for their name
 * @returns return a list of users that match the provided filter criteria.

 */
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

  /**
   * This static async function deletes a user from the "users" table based on the provided id.
   */
  static async deleteUsers(id: string) {
    const query = this.queryBuilder().delete().table("users").where({ id: id });
    const data = await query;
    return data;
  }

  static async getPermissions(id: string) {
    const query = this.queryBuilder()
      .select("permission")
      .table("permissions")
      .where({ user_id: +id });
    const data = await query;
    return data;
  }

  static async getUserPermissions(id: string) {
    const query = this.queryBuilder()
      .select("permission")
      .table("permissions")
      .where({ user_id: +id });
    const data = await query;
    return data;
  }

  static async getUserByEmail(email: string) {
    const query = this.queryBuilder()
      .select("*")
      .table("users")
      .where({ email })
      .first();
    const data = await query;
    return data;
  }

  static async getUserById(id: string) {
    const query = this.queryBuilder()
      .select("*")
      .table("users")
      .where({ id })
      .first();
    const data = await query;
    return data;
  }
}

export const users: User[] = [];
