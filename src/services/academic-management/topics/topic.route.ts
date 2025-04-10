import { Router } from "express";
import asyncHandler from "../../../middlewares/asynchandler";
import * as TopicController from "./topic.controller";
const router = Router();

router.get("/", asyncHandler(TopicController.get));
router.get("/count", asyncHandler(TopicController.count));
router.post("/", asyncHandler(TopicController.post));
router.patch("/:id", asyncHandler(TopicController.patch));
router.delete("/:id", asyncHandler(TopicController.del));

export default router;