import { Router } from "express";
import * as Controller from "./user-profile.controller";
import asyncHandler from "../../../middlewares/asynchandler";


const router = Router();

router.get("/", asyncHandler(Controller.get));
router.post("/", asyncHandler(Controller.post));
router.patch("/:id", asyncHandler(Controller.patch));
router.delete("/:id", asyncHandler(Controller.del));

export default router;