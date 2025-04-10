import { Router } from "express";
import asyncHandler from "../../../middlewares/asynchandler";
import * as AssignmentController from "./assignment.controller";
const router = Router();

router.get("/", asyncHandler(AssignmentController.get));
router.get("/count", asyncHandler(AssignmentController.count));
router.post("/", asyncHandler(AssignmentController.post));
router.patch("/:id", asyncHandler(AssignmentController.patch));
router.delete("/:id", asyncHandler(AssignmentController.del));

export default router;