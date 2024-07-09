import express from "express";
import {
  deleteTodos,
  getTodos,
  postTodos,
  putTodos,
  getTodosById,
} from "../controller/todo.controller";
import { auth } from "../middleware/auth.middleware";
import { authenticateToken } from "../middleware/user_id.middleware";

const router = express();

router.use(authenticateToken);

router.get("/", auth, getTodos);

router.get("/:id", auth, getTodosById);

router.post("/", auth, postTodos);

router.put("/:id", auth, putTodos);

router.delete("/:id", auth, deleteTodos);

export default router;
