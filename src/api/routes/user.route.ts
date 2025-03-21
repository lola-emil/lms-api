import { Router } from "express";
import asyncHandler from "../../middlewares/asynchandler";
import * as UserController from "../controllers/user.controller";
import { checkPermissions, verifyJwtToken } from "../../middlewares/authorization";

const router = Router();

router.use(verifyJwtToken);
router.use(checkPermissions);

router.get("/", asyncHandler(UserController.get));
router.post("/", asyncHandler(UserController.insert));
router.patch("/:id");
router.delete("/:id", asyncHandler(UserController.remove));

export default router;