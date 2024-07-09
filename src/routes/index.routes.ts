import express from "express";

import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import todoRouter from "./todo.routes";

const router = express();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/todo", todoRouter);

export default router;
