import { Router } from "express";
import asyncHandler from "../../middlewares/asynchandler";
import * as ClassLevelController from "../controllers/class-level.controller";
import { checkPermissions, verifyJwtToken } from "../../middlewares/authorization";

const router = Router();

router.use(verifyJwtToken);
router.use(checkPermissions);

router.get("/", asyncHandler(ClassLevelController.get));
router.post("/", asyncHandler(ClassLevelController.insert));
router.patch("/:id");
router.delete("/:id", asyncHandler(ClassLevelController.remove));

export default router;