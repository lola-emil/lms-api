import { Router } from "express";

import userManagement from "./user-management";
import acadmicManagement from "./academic-management";
import subjectManagement from "./subject management";
import curriculum from "./curriculum";

const router = Router();

router.use("/user-management", userManagement);
router.use("/academic-management", acadmicManagement);
router.use("/subject-management", subjectManagement);


router.use("/curriculum", curriculum);
export default router;