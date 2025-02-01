import { Router } from "express";
import * as userController from "../controllers/user-controller";
import asyncHandler from "../../../shared/middlewares/asynchandler";

const router = Router();

router.post("/", asyncHandler(userController.insert));
router.get("/", asyncHandler(userController.find));
router.patch("/:id", asyncHandler(userController.update));
router.delete("/:id", asyncHandler(userController.remove));

export default router;