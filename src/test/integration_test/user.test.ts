import request from "supertest";
import express from "express";
import router from "../../routes/index.routes";
import expect from "expect";
import { genericErrorHandler } from "../../middleware/errorHandler";

describe("User Integration Test Suite", () => {
  const app = express();
  const token = "dsajfennjhaysuj347hanffkklfnda0349324809";
  app.use(express.json());

  app.use(router);
  app.use(genericErrorHandler);

  describe("createUser", () => {
    it("Should create a new user", async () => {
      const response = await request(app)
        .post("/users")
        .set("Authorization", token)
        .send({
          id: "2",
          name: "test user",
          email: "test@gmail.com",
          password: "Test@1234",
          permissions: [],
        });
      expect(response.body).toHaveProperty("message", "User created");
    });
  });

  describe("getUserById", () => {
    it("Should return user by id", async () => {
      const userId = "1";

      const response = await request(app)
        .get(`/users/${userId}`)
        .set("Authorization", token);

      expect(response.body).toHaveProperty("id", "1");
      expect(response.body).toHaveProperty("name", "abcd");
      expect(response.body).toHaveProperty("email", "abcd@gmail.com");
    });

    it("Should return error when user is not found", async () => {
      const userId = "10";

      const response = await request(app)
        .get(`/users/${userId}`)
        .set("Authorization", token);

      expect(response.status).toBe(404);
      const responseBody = JSON.parse(response.text);
      expect(responseBody).toHaveProperty("message", "Not Found");
    });
  });

  describe("updateUser", () => {
    it("Should update user", async () => {
      const userId = "1";
      const response = await request(app)
        .put(`/users/${userId}`)
        .set("Authorization", token)
        .send({
          id: userId,
          name: "apple",
          email: "abcd@gmail.com",
          password:
            "$2b$10$I24gdNea7i6fSXPl1uy96.cle9N5v6Zt8HyZTkTpFhD.kwzHeBHNW",
          permissions: ["users"],
        });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("id", "1");
      expect(response.body.data).toHaveProperty("name", "apple");
    });

    it("Should return error if user not found", async () => {
      const userId = "10";
      const response = await request(app)
        .put(`/users/${userId}`)
        .set("Authorization", token)
        .send({
          name: "NonExistingUser",
        });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Internal Server Error");
    });
  });

  describe("deleteUser", () => {
    it("Should delete user", async () => {
      const userId = "1";
      const response = await request(app)
        .delete(`/users/${userId}`)
        .set("Authorization", token);

      expect(response.status).toBe(200);
      expect(response.body.userDeletionResult).toHaveProperty(
        "message",
        `user${userId} is deleted`
      );
    });

    it("Should return error if user not found", async () => {
      const userId = "10";
      const response = await request(app)
        .delete(`/users/${userId}`)
        .set("Authorization", token);

      expect(response.status).toBe(404);
      const responseBody = JSON.parse(response.text);
      expect(responseBody).toHaveProperty("message", "Not Found");
    });
  });
});
