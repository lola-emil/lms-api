import { Router } from "express";

import userRoute from "./users/users.route";
import userProfileRoute from "./user-profiles/user-profile.route";
import userRoleRoute from "./user-roles/user-roles.route";
import subjectRoute from "./subjects/subject.route";
import studentClassLevelRoute from "./student-class-level/student-class-level.route";
import teacherSubjectRoute from "./teacher-subject/teacher-subject.route";
import subjectMaterialRoute from "./subject-material/subject-material.route";
import choiceRoute from "./choices/choice.route";
import questionRoute from "./questions/question.route";
import quizSession from "./quiz-sessions/quiz-session.route";

import classworkRoute from "./classworks/classworks.route";
import classworkSubmissionRoute from "./classwork-submissions/classwork-submission.route";
import classworkAttachmentRoute from "./classwork-attachments/classwork-attachments.route";

const router = Router();

router.use("/users", userRoute);
router.use("/user-profiles", userProfileRoute);
router.use("/user-roles", userRoleRoute);

router.use("/subjects", subjectRoute);
router.use("/student-class-levels", studentClassLevelRoute);
router.use("/teacher-subjects", teacherSubjectRoute);
router.use("/subject-materials", subjectMaterialRoute);
router.use("/choices", choiceRoute);
router.use("/questions", questionRoute);
router.use("/quiz-sessions", quizSession);


router.use("/classworks", classworkRoute);
router.use("/classwork-submissions", classworkSubmissionRoute);
router.use("/classwork-attachments", classworkAttachmentRoute);


export default router;