import { Router } from "express";

import subjectRoute from "./subjects/subject.route";
import topicRoute from "./topics/topics.route";
import lessonRoute from "./lessons/lesson.route";
import teacherSubjectRoute from "./teacher-subjects/teacher-subjects.route";
import subjectMaterialRoute from "./subject-materials/subject-materials.route";

import subjectTopicRoute from "./subject-topics/subject-topics.route";

const router = Router();

router.use("/subjects", subjectRoute);
router.use("/topics", topicRoute);
router.use("/subject-topics", subjectTopicRoute);
router.use("/lessons", lessonRoute);

router.use("/teacher-subjects", teacherSubjectRoute);
router.use("/subject-materials", subjectMaterialRoute);

export default router;