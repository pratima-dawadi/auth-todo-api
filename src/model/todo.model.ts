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

export function listTodos(user_id: string) {
  return todolist.filter((todo) => todo.userid === user_id);
}

export function getIdFromModel(id: string, user_id: string) {
  return todolist.find(
    (todo) => todo.id === Number(id) && todo.userid === user_id
  );
}

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
