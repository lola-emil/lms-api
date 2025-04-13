import { Router } from "express";
import subjectRoute from "./subjects/subject.route";
import topicRoute from "./topics/topics.route";

const router = Router();

router.use("/subjects", subjectRoute);
router.use("/topics", topicRoute);

export default router;