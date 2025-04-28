import { Router } from "express";
import * as Controller from "./subject-material.controller";
import asyncHandler from "../../../middlewares/asynchandler";
import multer from "multer";
import path from "path";


const router = Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // your upload folder
    },
    filename: function (req, file, cb) {
        // Extract original extension
        const ext = path.extname(file.originalname);
        // Create a custom filename
        const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        cb(null, filename);
    }
});


const upload = multer({ dest: "uploads/", storage });

router.get("/", asyncHandler(Controller.get));
router.post("/", upload.single("moduleFile"), asyncHandler(Controller.post));
router.patch("/:id", asyncHandler(Controller.patch));
router.delete("/:id", asyncHandler(Controller.del));

export default router;