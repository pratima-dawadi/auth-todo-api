import sinon from "sinon";
import expect from "expect";
import {
  checkId,
  removeTodos,
  createTodos,
  updateTodos,
} from "../../../service/todo.service";
import * as TodoModel from "../../../model/todo.model";
import { ITodos } from "../../../interfaces/todo.interfaces";

describe("Todo Service Test Suite", () => {
  describe("getTodo", () => {
    let getTodoStub: sinon.SinonStub;

    beforeEach(() => {
      getTodoStub = sinon.stub(TodoModel, "getIdFromModel");
    });

    afterEach(() => {
      getTodoStub.restore();
    });

    it("Should return todo list of user by id", () => {
      const todo: ITodos = {
        name: "Learn Node",
        description: "Learn Node.js and express",
        status: "completed",
        userid: "1",
      };

      getTodoStub.returns(todo);

      const response = checkId("1", "1");

      expect(response).toStrictEqual(todo);
    });
  });

  describe("removeTodos", () => {
    let removeTodosStub: sinon.SinonStub;

    beforeEach(() => {
      removeTodosStub = sinon.stub(TodoModel, "deleteTodo");
    });

    afterEach(() => {
      removeTodosStub.restore();
    });

    it("Should delete todo for user by id", () => {
      removeTodosStub.returns(undefined);

      removeTodos(1, "1");

      expect(removeTodosStub.callCount).toBe(1);
      expect(removeTodosStub.getCall(0).args).toStrictEqual([1, 1]);
    });
  });

  describe("createTodos", () => {
    let createTodosStub: sinon.SinonStub;

    beforeEach(() => {
      createTodosStub = sinon.stub(TodoModel, "createTodos");
    });

    afterEach(() => {
      createTodosStub.restore();
    });

    it("Should create a new todo for the user", () => {
      const todo: ITodos = {
        name: "test",
        description: "test description",
        status: "completed",
        userid: "1",
      };

      const userId = "1";

      const todoWithUserId = { ...todo, userId };

      createTodos(todo, userId);

      expect(createTodosStub.callCount).toBe(1);
      expect(createTodosStub.getCall(0).args).toStrictEqual([todoWithUserId]);
    });
  });

  describe("updateTodosById", () => {
    let updateTodosStub: sinon.SinonStub;

    beforeEach(() => {
      updateTodosStub = sinon.stub(TodoModel, "updateTodos");
    });

    afterEach(() => {
      updateTodosStub.restore();
    });

    it("Should update todo by id for the user", () => {
      const todo: ITodos = {
        name: "updated",
        description: "updating the todo",
        status: "completed",
        userid: "1",
      };

      const userId = "1";
      const todoId = "1";

      updateTodos(todoId, todo, userId);

      expect(updateTodosStub.callCount).toBe(1);
      expect(updateTodosStub.getCall(0).args).toStrictEqual([
        todoId,
        todo,
        userId,
      ]);
    });
  });
});
