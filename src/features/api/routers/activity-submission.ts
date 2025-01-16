import { Router } from "express";
import asyncHandler from "../../../shared/middlewares/asynchandler";
import * as ActivitySubmissionController from "../controllers/activity-submission-controller";

const router = Router();

router.post("/", asyncHandler(ActivitySubmissionController.store));
router.get("/", asyncHandler(ActivitySubmissionController.get));
router.patch("/:id", asyncHandler(ActivitySubmissionController.updateById));
router.delete("/:id", asyncHandler(ActivitySubmissionController.deleteById));

export default router;