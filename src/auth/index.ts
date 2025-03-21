import { Router } from "express";
import asyncHandler from "../middlewares/asynchandler";
import authRouter from "./routes/auth.route";

const router = Router();

router.use("/auth", authRouter);

export default router;