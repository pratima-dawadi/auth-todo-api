import { todo } from "node:test";
import { ITodos } from "../interfaces/todo.interfaces";

const todolist = [
  {
    id: 1,
    name: "Learn Node",
    description: "Learn Node.js and express",
    status: "completed",
    userid: "1",
  },
  {
    id: 2,
    name: "Learn React",
    description: "Learn React.js",
    status: "completed",
    userid: "2",
  },
];

/**
 * The function `listTodos` filters a list of todos based on the user_id provided.
 * @param {string} user_id - User ID
 * @returns Return a list of todos based on the user_id.
 */
export function listTodos(user_id: string) {
  return todolist.filter((todo) => todo.userid === user_id);
}

/**
 * The function `getIdFromModel` retrieves a specific todo item based on its ID and user ID.
 * @param {string} id - task id
 * @param {string} user_id - user id
 * @returns Return a todo item based on the id and user_id.
 */
export function getIdFromModel(id: string, user_id: string) {
  return todolist.find(
    (todo) => todo.id === Number(id) && todo.userid === user_id
  );
}

/**
 * The function `createTodos` adds a new todo item to a list with the provided details and user ID.
 * @param {ITodos} body - ITodos object that contains the details of the todo item to be created.
 * @param {string} user_id - User ID
 * @returns Return the newly created todo item.
 */
export function createTodos(body: ITodos, user_id: string) {
  const addTodo = {
    id: todolist.length + 1,
    name: body.name,
    description: body.description,
    status: body.status,
    userid: user_id,
  };
  todolist.push(addTodo);
  return addTodo;
}

/**
 * This updateTodos function updates a todo item in a list based on the provided id and user_id.
 * @param {number} id - task id
 * @param {ITodos} body - ITodos object that contains the details of the todo item to be updated
 * @param {string} user_id - user id
 * @returns Return the updated todo item.
 */
export function updateTodos(id: number, body: ITodos, user_id: string) {
  const index = todolist.findIndex(
    (todo) => todo.id === id && todo.userid === user_id
  );
  if (index === -1) {
    return { error: "Todo not found or unauthorized" };
  }
  const updatedTodo = {
    id,
    name: body.name,
    description: body.description,
    status: body.status,
    userid: user_id,
  };

  todolist[index] = updatedTodo;
  return updatedTodo;
}

/**
 * This deleteTodo function deletes a todo item in a list based on the provided id and user_id.
 * @param {number} id - task id
 * @param {string} user_id - user id
 * @returns Return the deleted todo item.
 */
export function deleteTodo(id: number, user_id: string) {
  const index = todolist.findIndex(
    (todo) => todo.id === id && todo.userid === user_id
  );
  if (index === -1) {
    return { error: "Todo not found or unauthorized" };
  }
  const deletedTodo = todolist.splice(index, 1);
  return deletedTodo[0];
}
