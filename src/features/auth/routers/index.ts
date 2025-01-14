import { Router } from "express";

const router = Router();


router.post("/signin");

// Dapat ang admin ra ang maka access ani
router.post("/register");

export default router;