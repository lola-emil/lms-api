import { Router } from "express";
import userManagement from "./user-management";

const router = Router();

router.use("/user-management", userManagement);

export default router;