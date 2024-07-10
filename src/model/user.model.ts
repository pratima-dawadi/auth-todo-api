import { getUserQuery, User } from "../interfaces/user.interfaces";

const users: User[] = [
  {
    name: "abcd",
    email: "abcd@gmail.com",
    password: "$2b$10$sGjlIiRRwWY7B.0zietgNuY194/lo61u42U/CGyZr66sUS16wgr5m",
    permission: ["admin"],
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
    permission: ["user"],
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
    return { error: "User not found" };
  } 
  return users.splice(userIndex, 1);
}
