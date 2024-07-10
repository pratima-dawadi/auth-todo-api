import express from "express";
import {
  deleteTodos,
  getTodos,
  postTodos,
  putTodos,
  getTodosById,
} from "../controller/todo.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";
// import { authenticateToken } from "../middleware/user_id.middleware";

const router = express();

// router.use(authenticateToken);

router.get("/", authenticate, authorize("admin"||"user"), getTodos);

router.get("/:id", authenticate, getTodosById);

router.post("/", authenticate, postTodos);

router.put("/:id", authenticate, putTodos);

router.delete("/:id", authenticate, deleteTodos);

export default router;
