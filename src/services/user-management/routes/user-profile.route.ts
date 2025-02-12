import { Router } from "express";
import * as UserProfileController from "../controllers/user-profile.controller";
import asyncHandler from "../../../shared/middlewares/asynchandler";

const router = Router();

router.get("/", asyncHandler(UserProfileController.find));
router.put("/:id", asyncHandler(UserProfileController.update));

export default router;