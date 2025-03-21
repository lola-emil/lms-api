import { Router } from "express";
import asyncHandler from "../../middlewares/asynchandler";
import * as UserRoleController from "../controllers/user-role.controller";

const router = Router();

router.get("/", asyncHandler(UserRoleController.get));
router.post("/", asyncHandler(UserRoleController.insert));
router.patch("/:id");
router.delete("/:id", asyncHandler(UserRoleController.remove));

export default router;