import { Router } from "express";
import asyncHandler from "../../../middlewares/asynchandler";
import * as Controller from "./users.controller";

import multer from "multer";

const upload = multer({ dest: "temp/" });

const router = Router();

router.get("/count", asyncHandler(Controller.count));

router.post("/bulk", upload.single("importFile"), asyncHandler(Controller.bulkImport));

router.get("/", asyncHandler(Controller.get));
router.post("/", asyncHandler(Controller.post));
router.patch("/:id", asyncHandler(Controller.patch));
router.delete("/:id", asyncHandler(Controller.del));

export default router;