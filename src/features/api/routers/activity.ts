import { Router } from "express";
import asyncHandler from "../../../shared/middlewares/asynchandler";
import * as ActivityController from "../controllers/activity-controller";

const router = Router();

router.post("/", asyncHandler(ActivityController.store));
router.get("/", asyncHandler(ActivityController.get));
router.patch("/:id", asyncHandler(ActivityController.updateById));
router.delete("/:id", asyncHandler(ActivityController.deleteById));

export default router;