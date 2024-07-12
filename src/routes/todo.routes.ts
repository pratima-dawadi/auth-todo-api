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

router.get("/", authenticate, authorize("admin" || "user"), getTodos);

router.get("/:id", authenticate, getTodosById);

router.post(
  "/",
  authenticate,
  validateReqBody(createTodoBodySchema),
  postTodos
);

router.put(
  "/:id",
  authenticate,
  validateReqBody(updateTodoBodySchema),
  putTodos
);

router.delete("/:id", authenticate, deleteTodos);

export default router;
