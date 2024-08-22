import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByQuery,
} from "../controller/user.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { validateReqBody } from "../middleware/validator.middleware";
import {
  createUserBodySchema,
  getUserQuerySchema,
  updateUserBodySchema,
} from "../schema/user.schema";

const router = express();

router.get("/", authenticate, authorize("get.users"), getUsers);

router.get(
  "/query",
  authenticate,
  authorize("get.users"),
  validateReqBody(getUserQuerySchema),
  getUserByQuery
);

router.get("/:id", authenticate, authorize("get.users"), getUserById);

router.post(
  "/",
  authenticate,
  authorize("create.users"),
  validateReqBody(createUserBodySchema),
  createUser
);

router.put(
  "/:id",
  authenticate,
  authorize("update.users"),
  validateReqBody(updateUserBodySchema),
  updateUser
);

router.delete("/:id", authenticate, authorize("delete.users"), deleteUser);

export default router;
