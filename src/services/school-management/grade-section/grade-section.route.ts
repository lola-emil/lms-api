import { Router } from "express";
import asyncHandler from "../../../middlewares/asynchandler";

import * as GradeSectionController from "./grade-section.controller";

const router = Router();


router.get("/", asyncHandler(GradeSectionController.get));
router.get("/count", asyncHandler(GradeSectionController.count));
router.post("/", asyncHandler(GradeSectionController.post));
router.patch("/:id", asyncHandler(GradeSectionController.patch));
router.delete("/:id", asyncHandler(GradeSectionController.del));


export default router;