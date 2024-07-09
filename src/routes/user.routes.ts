import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
} from "../controller/user.controller";

const router = express();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

export default router;
