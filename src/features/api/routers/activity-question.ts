import { Router } from "express";
import asyncHandler from "../../../shared/middlewares/asynchandler";
import * as ActivityQuestionController from "../controllers/activity-question-controller";

const router = Router();

router.post("/", asyncHandler(ActivityQuestionController.store));
router.get("/", asyncHandler(ActivityQuestionController.get));
router.patch("/:id", asyncHandler(ActivityQuestionController.updateById));
router.delete("/:id", asyncHandler(ActivityQuestionController.deleteById));

export default router;