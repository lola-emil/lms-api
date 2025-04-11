import { Router } from "express";
import userManagement from "./user-management";
import acadmicManagement from "./academic-management";

const router = Router();

router.use("/user-management", userManagement);
router.use("/academic-management", acadmicManagement);

export default router;