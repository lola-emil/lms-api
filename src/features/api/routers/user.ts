import { Router } from "express";
import asyncHandler from "../../../shared/middlewares/asynchandler";
import * as UserController from "../controllers/user-controller";

const router = Router();

router.post("/", asyncHandler(UserController.store));
router.get("/", asyncHandler(UserController.get));
router.patch("/:id", asyncHandler(UserController.updateById));
router.delete("/:id", asyncHandler(UserController.deleteById));

export default router;