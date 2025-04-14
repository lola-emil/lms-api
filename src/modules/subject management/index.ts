import { Router } from "express";

import subjectRoute from "./subjects/subject.route";
import topicRoute from "./topics/topics.route";
import lessonRoute from "./lessons/lesson.route";

const router = Router();

router.use("/subjects", subjectRoute);
router.use("/topics", topicRoute);
router.use("/lessons", lessonRoute);

export default router;