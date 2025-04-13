import { Router } from "express";
import userManagement from "./user-management";
import acadmicManagement from "./academic-management";
import subjectManagement from "./subject management";

const router = Router();

router.use("/user-management", userManagement);
router.use("/academic-management", acadmicManagement);
router.use("/subject-management", subjectManagement);

export default router;