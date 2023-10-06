import express from "express";
import { login, register, refreshToken, logout, loginAdmin } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/loginAdmin", loginAdmin);
router.post("/register", register);
router.post("/logout", logout);
router.get("/refreshToken", refreshToken);

export default router;
