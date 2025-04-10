import { Router } from "express";

import gradeLevelRoute from "./grade-levels/grade-level.route";
import gradeSectionRoute from "./grade-sections/grade-sections.route";
import subjectRoute from "./subjects/subject.route";
import topicRoute from "./topics/topics.route";

const router = Router();

router.use("/grade-levels", gradeLevelRoute);
router.use("/grade-sections", gradeSectionRoute);
router.use("/subjects", subjectRoute);
router.use("/topics", topicRoute);

export default router;