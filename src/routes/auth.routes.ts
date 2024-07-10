import express from "express";
import { login, refreshToken } from "../controller/auth.controller";

const router = express();

router.post("/login", login);
router.post("/refresh", refreshToken);

export default router;
