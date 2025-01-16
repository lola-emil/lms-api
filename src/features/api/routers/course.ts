import { Router } from "express";
import asyncHandler from "../../../shared/middlewares/asynchandler";
import * as CourseController from "../controllers/course-controller";

const router = Router();

router.post("/", asyncHandler(CourseController.store));
router.get("/", asyncHandler(CourseController.get));
router.patch("/:id", asyncHandler(CourseController.updateById));
router.delete("/:id", asyncHandler(CourseController.deleteById));

export default router;