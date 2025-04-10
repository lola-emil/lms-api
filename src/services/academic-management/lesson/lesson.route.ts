import { Router } from "express";
import asyncHandler from "../../../middlewares/asynchandler";
import * as LessonController from "./lesson.controller";
const router = Router();

router.get("/", asyncHandler(LessonController.get));
router.get("/count", asyncHandler(LessonController.count));
router.post("/", asyncHandler(LessonController.post));
router.patch("/:id", asyncHandler(LessonController.patch));
router.delete("/:id", asyncHandler(LessonController.del));

export default router;