import { Router } from "express";
const router = Router();

router.get("/", (_req, res) => {
	res.json({ title: "Home Page" }).end();
});

export default router;
