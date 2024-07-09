import { ITodos } from "../interfaces/todo.interfaces";
import { getIdFromModel } from "../model/todo.model";
import * as TodoModel from "../model/todo.model";

export function checkId(id: string, user_id: string) {
  const todoId = getIdFromModel(id, user_id);

  if (!todoId) {
    return {
      error: `Todo with id ${id} not found`,
    };
  }

  return todoId;
}

export function createTodos(body: ITodos, user_id: string) {
  TodoModel.createTodos(body, user_id);
}

export function updateTodos(id: string, body: ITodos, user_id: string) {
  const updatedToDo = TodoModel.updateTodos(Number(id), body, user_id);
  if (updatedToDo.hasOwnProperty("error")) {
    return { error: "Task does not belong to the user or is invalid" };
  }
  return updatedToDo;
}

export function removeTodos(id: number, user_id: string) {
  const deletedTodo = TodoModel.deleteTodo(id, user_id);
  if (deletedTodo.hasOwnProperty("error")) {
    return { error: "Task does not belong to the user or is invalid" };
  }
  return deletedTodo;
}
