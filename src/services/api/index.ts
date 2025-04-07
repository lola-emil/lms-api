import { Router } from "express";

import userRoute from "./user/user.route";
import gradeSectionRoute from "./grade-section/grade-section.route";
import gradeLevelRoute from "./grade-level/grade-level.route";

const router = Router();



router.use("/grade-sections", gradeSectionRoute);
router.use("/grade-levels", gradeLevelRoute);

router.use("/users", userRoute);


export default router;