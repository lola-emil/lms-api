import { Router } from "express";
import asyncHandler from "../../../shared/middlewares/asynchandler";
import * as LearningMaterialController from "../controllers/learning-material-controller";

const router = Router();

router.post("/", asyncHandler(LearningMaterialController.store));
router.get("/", asyncHandler(LearningMaterialController.get));
router.patch("/:id", asyncHandler(LearningMaterialController.updateById));
router.delete("/:id", asyncHandler(LearningMaterialController.deleteById));

export default router;