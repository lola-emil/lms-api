import { Router } from "express";
import * as Controller from "./auth.controller";
import asyncHandler from "../../middlewares/asynchandler";

const router = Router();

router.post("/sign-in", asyncHandler(Controller.signIn));

export default router;