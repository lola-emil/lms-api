import { Router } from "express";
import * as UserController from "./user.controller";
import asyncHandler from "../../../middlewares/asynchandler";

const router = Router();

router.get("/", asyncHandler(UserController.get));
router.get("/count", asyncHandler(UserController.count));
router.post("/", asyncHandler(UserController.post));
router.patch("/:id", asyncHandler(UserController.patch));
router.delete("/:id", asyncHandler(UserController.del));

export default router;