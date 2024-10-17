import { Router } from "express";
import { login, logout, refresh, signup } from "../controllers/auth";

const router = Router();

router.post("/login", login);
router.get("/refresh", refresh);
router.post("/logout", logout);
router.post("/signup", signup);

export default router;
