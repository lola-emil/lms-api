import { Router } from "express";
import asyncHandler from "../../middlewares/asynchandler";
import * as UserRolePermissionCotroller from "../controllers/user-role-permission.controller";

const router = Router();

router.get("/", asyncHandler(UserRolePermissionCotroller.get));
router.post("/", asyncHandler(UserRolePermissionCotroller.insert));
router.patch("/:id");
router.delete("/:id", asyncHandler(UserRolePermissionCotroller.remove));

export default router;