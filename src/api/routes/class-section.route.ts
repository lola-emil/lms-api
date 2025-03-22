import { Router } from "express";
import asyncHandler from "../../middlewares/asynchandler";
import * as ClassSectionController from "../controllers/class-section.controller";
import { checkPermissions, verifyJwtToken } from "../../middlewares/authorization";

const router = Router();

router.use(verifyJwtToken);
router.use(checkPermissions);

router.get("/", asyncHandler(ClassSectionController.get));
router.post("/", asyncHandler(ClassSectionController.insert));
router.patch("/:id");
router.delete("/:id", asyncHandler(ClassSectionController.remove));

export default router;