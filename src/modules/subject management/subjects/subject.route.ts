import { Router } from "express";
import asyncHandler from "../../../middlewares/asynchandler";
import * as Controller from "./subjects.controller";

const router = Router();

router.get("/count", asyncHandler(Controller.count));
router.get("/", asyncHandler(Controller.get));
router.post("/", asyncHandler(Controller.post));
router.patch("/:id", asyncHandler(Controller.patch));
router.delete("/:id", asyncHandler(Controller.del));

export default router;