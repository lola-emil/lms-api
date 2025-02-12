import { Router } from "express";
import asyncHandler from "../../../shared/middlewares/asynchandler";
import * as RoleController from "../controllers/user-role.controller";

const router = Router();


router.get("/", asyncHandler(RoleController.find));
router.post("/", asyncHandler(RoleController.insert));
router.put("/:id", asyncHandler(RoleController.update));
router.delete("/:id", asyncHandler(RoleController.remove));

export default router;