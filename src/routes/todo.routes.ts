import express from "express";
import {
  deleteTodos,
  getTodos,
  postTodos,
  putTodos,
  getTodosById,
} from "../controller/todo.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { validateReqBody } from "../middleware/validator.middleware";
import {
  createTodoBodySchema,
  updateTodoBodySchema,
} from "../schema/todo.schema";

const router = express();

router.get("/", authenticate, authorize("get.todos"), getTodos);

router.get("/:id", authenticate, authorize("get.todos"), getTodosById);

router.post(
  "/",
  authenticate,
  authorize("create.todos"),
  validateReqBody(createTodoBodySchema),
  postTodos
);

router.put(
  "/:id",
  authenticate,
  authorize("update.todos"),
  validateReqBody(updateTodoBodySchema),
  putTodos
);

router.delete("/:id", authenticate, authorize("delete.todos"), deleteTodos);

export default router;
