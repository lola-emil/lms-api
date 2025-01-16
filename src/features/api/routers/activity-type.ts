import { Router } from "express";
import asyncHandler from "../../../shared/middlewares/asynchandler";
import * as ActivityTypeController from "../controllers/activity-type-controller";

const router = Router();

router.post("/", asyncHandler(ActivityTypeController.store));
router.get("/", asyncHandler(ActivityTypeController.get));
router.patch("/:id", asyncHandler(ActivityTypeController.updateById));
router.delete("/:id", asyncHandler(ActivityTypeController.deleteById));

export default router;