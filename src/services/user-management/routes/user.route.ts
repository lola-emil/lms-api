import { Router } from "express";
import asyncHandler from "../../../shared/middlewares/asynchandler";
import * as UserController from "../controllers/user.controller";

const router = Router();

router.post("/", asyncHandler(UserController.insert))
router.get("/", asyncHandler(UserController.find));
router.put("/:id", asyncHandler(UserController.update));

export default router;