import { Router } from "express";
import asyncHandler from "../../../middlewares/asynchandler";

import * as GradeLevelController from "./grade-level.controller";

const router = Router();


router.get("/", asyncHandler(GradeLevelController.get));
router.post("/", asyncHandler(GradeLevelController.post));
router.patch("/:id", asyncHandler(GradeLevelController.patch));
router.delete("/:id", asyncHandler(GradeLevelController.del));


export default router;