import { Router } from "express";

import userRoute from "./user-management/user/user.route";
import gradeSectionRoute from "./school-management/grade-section/grade-section.route";
import gradeLevelRoute from "./school-management/grade-level/grade-level.route";

import subjectRoute from "./academic-management/subjects/subject.route";
import topicRoute from "./academic-management/topics/topic.route";
import lessonRoute from "./academic-management/lesson/lesson.route";
import assignmentRoute from "./academic-management/assignments/assignment.route";

const router = Router();



router.use("/grade-sections", gradeSectionRoute);
router.use("/grade-levels", gradeLevelRoute);

router.use("/users", userRoute);


router.use("/subjects", subjectRoute);
router.use("/topics", topicRoute);
router.use("/lessons", lessonRoute);
router.use("/assignments", assignmentRoute);

export default router;