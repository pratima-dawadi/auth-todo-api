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

router.get("/", authenticate, authorize("admin"), getUsers);

router.get(
  "/query",
  authenticate,
  authorize("admin"),
  validateReqBody(getUserQuerySchema),
  getUserByQuery
);

router.get("/:id", authenticate, authorize("admin"), getUserById);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validateReqBody(createUserBodySchema),
  createUser
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validateReqBody(updateUserBodySchema),
  updateUser
);

router.delete("/:id", authenticate, authorize("admin"), deleteUser);

export default router;
