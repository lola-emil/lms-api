import { Router } from "express";

import quizRoute from "./quizzes/quizzes.route";
import questionRoute from "./questions/questions.route";
import answerRoute from "./answers/answers.route";
import quizQuestionRotue from "./quiz-questions/quiz-questions.route";
import quizSessionRoute from "./quiz-sessions/quiz-sessions.route";


const router = Router();


router.use("/quizzes", quizRoute);
router.use("/questions", questionRoute);
router.use("/answers", answerRoute);
router.use("/quiz-questions", quizQuestionRotue);
router.use("/quiz-sessoin-route", quizSessionRoute);


export default router;