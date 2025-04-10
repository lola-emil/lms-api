import { Router } from "express";
import asyncHandler from "../../../middlewares/asynchandler";
import * as SubjectController from "./subject.controller";
const router = Router();

router.get("/", asyncHandler(SubjectController.get));
router.get("/count", asyncHandler(SubjectController.count));
router.post("/", asyncHandler(SubjectController.post));
router.patch("/:id", asyncHandler(SubjectController.patch));
router.delete("/:id", asyncHandler(SubjectController.del));

export default router;