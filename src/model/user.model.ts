import { getUserQuery, User } from "../interfaces/user.interfaces";

const users: User[] = [];

export function getUserById(id: string) {
  return users.find(({ id: userId }) => userId === id);
}

export function createUser(user: User) {
  return users.push({
    ...user,
    id: `${users.length + 1}`,
  });
}

export function getUsers(query: getUserQuery) {
  const { q } = query;
  if (q) {
    return users.filter(({ name }) => name === q);
  }
  return users;
}

export function getUserByEmail(email: string) {
  return users.find(({ email: userEmail }) => userEmail === email);
}
