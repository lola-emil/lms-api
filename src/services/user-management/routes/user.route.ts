import { Router } from "express";
import asyncHandler from "../../../shared/middlewares/asynchandler";
import * as UserController from "../controllers/user.controller";

const router = Router();

router.post("/", asyncHandler(UserController.insert))
router.get("/", asyncHandler(UserController.find));
router.post("/:id/verify-email", asyncHandler(UserController.insert))
router.put("/:id", asyncHandler(UserController.update));

export default router;