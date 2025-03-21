import { Router } from "express";
import asyncHandler from "../../middlewares/asynchandler";
import * as AuthController from "../controllers/auth.controller";
import { verifyJwtToken } from "../../middlewares/authorization";

const router = Router();

router.post("/sign", asyncHandler(AuthController.signIn))

router.post("/logout", verifyJwtToken, asyncHandler(AuthController.logout))

export default router;