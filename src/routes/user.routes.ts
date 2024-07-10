import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/user.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = express();

router.get("/", authenticate, authorize("admin"), getUsers);

router.get("/:id", authenticate, authorize("admin"), getUserById);

router.post("/", authenticate, authorize("admin"), createUser);

router.put("/:id", authenticate, authorize("admin"), updateUser);

router.delete("/:id", authenticate, authorize("admin"), deleteUser);

export default router;
