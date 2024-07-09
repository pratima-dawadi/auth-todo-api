import express from "express";
import { login } from "../controller/auth.controller";

const router = express();

router.post("/login", login);

export default router;
