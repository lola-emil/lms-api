import { Router } from "express";

import gradeLevelRoute from "./grade-levels/grade-level.route";
import gradeSectionRoute from "./grade-sections/grade-sections.route";

import schoolYearRoute from "./school-year/school-year.route";
import studentLevelRoute from "./student-levels/student-level.route";

const router = Router();

router.use("/grade-levels", gradeLevelRoute);
router.use("/grade-sections", gradeSectionRoute);
router.use("/school-years", schoolYearRoute);
router.use("/student-levels", studentLevelRoute);

export default router;