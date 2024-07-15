import sinon from "sinon";
import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUser,
} from "../../../service/user.service";
import expect from "expect";
import bcrypt from "bcrypt";
import * as UserModel from "../../../model/user.model";
import { BadRequestError } from "../../../error/BadRequestError";

describe("User Service Test Suite", () => {
  describe("getUserById", () => {
    let getUserByIdStub: sinon.SinonStub;

    beforeEach(() => {
      getUserByIdStub = sinon.stub(UserModel, "getUserById");
    });

    afterEach(() => {
      getUserByIdStub.restore();
    });

    it("Should throw error id user not found", () => {
      getUserByIdStub.returns(undefined);

      expect(() => getUserById("10")).toThrow(
        new BadRequestError("User with Id not found")
      );
    });

    it("Should return user of userid", () => {
      const user = {
        id: "1",
        name: "abcd",
        email: "abcd@gmail.com",
        password: "abcd",
        permissions: [],
      };

      getUserByIdStub.returns(user);

      const response = getUserById("1");

      expect(response).toStrictEqual(user);
    });
  });

  describe("createUser", () => {
    let bcryptHashStub: sinon.SinonStub;
    let createUserStub: sinon.SinonStub;

    beforeEach(() => {
      bcryptHashStub = sinon.stub(bcrypt, "hash");
      createUserStub = sinon.stub(UserModel, "createUser");
    });

    afterEach(() => {
      bcryptHashStub.restore();
      createUserStub.restore();
    });

    it("Should create new user", async () => {
      bcryptHashStub.resolves("hashedPassword");

      const user = {
        id: "2",
        name: "test",
        email: "test@gmail.com",
        password: "Test@1234",
        permission: [],
      };

      await createUser(user);

      expect(bcryptHashStub.callCount).toBe(1);
      expect(bcryptHashStub.getCall(0).args).toStrictEqual([user.password, 10]);

      expect(createUserStub.callCount).toBe(1);
      expect(createUserStub.getCall(0).args).toStrictEqual([
        {
          ...user,
          password: "hashedPassword",
        },
      ]);
    });
  });

  describe("getUserByEmail", () => {
    let getUserByEmailStub: sinon.SinonStub;

    beforeEach(() => {
      getUserByEmailStub = sinon.stub(UserModel, "getUserByEmail");
    });

    afterEach(() => {
      getUserByEmailStub.restore();
    });

    it("Should throw error if user not found", () => {
      getUserByEmailStub.returns(undefined);

      expect(() => getUserByEmail("test@gmail.com")).toThrow(
        new BadRequestError("User does not exit")
      );
    });

    it("Should return user", () => {
      const user = {
        id: "1",
        name: "abcd",
        email: "abcd@gmail.com",
        password: "abcd",
        permissions: [],
      };

      getUserByEmailStub.returns(user);

      const response = getUserByEmail("abcd@gmail.com");

      expect(response).toStrictEqual(user);
    });
  });

  describe("deleteUser", () => {
    let deleteTodoByUserStub: sinon.SinonStub;
    let deleteUserByIdStub: sinon.SinonStub;

    it("Should throw error if deletion fails", () => {
      deleteTodoByUserStub.returns(true);
      deleteUserByIdStub.returns(false);

      expect(() => deleteUser("10")).toThrow(
        new BadRequestError("user does not exist")
      );
    });

    it("Should delete user", () => {
      const todoDelete = true;
      const userDelete = true;

      deleteTodoByUserStub.returns(todoDelete);
      deleteUserByIdStub.returns(userDelete);

      const response = deleteUser("1");

      expect(response).toStrictEqual({
        todoDelete,
        userDelete,
      });
    });
  });

  describe("updateUser", () => {
    let updateUserByIdStub: sinon.SinonStub;

    beforeEach(() => {
      updateUserByIdStub = sinon.stub(UserModel, "updateUser");
    });

    afterEach(() => {
      updateUserByIdStub.restore();
    });

    it("Should throw error if update fails", () => {
      updateUserByIdStub.returns(undefined);

      expect(() =>
        updateUser("1", {
          name: "updated",
          id: "",
          email: "",
          password: "",
          permission: [],
        })
      ).toThrow(new BadRequestError("user doesnot exist"));
    });

    it("Should update user", () => {
      const updatedUser = {
        id: "1",
        name: "updated",
        email: "abcd@gmail.com",
        password: "abcd",
        permissions: [],
      };

      updateUserByIdStub.returns(updatedUser);

      const response = updateUser("1", {
        name: "updated",
        id: "",
        email: "",
        password: "",
        permission: [],
      });

      expect(response).toStrictEqual(updatedUser);
    });
  });
});
