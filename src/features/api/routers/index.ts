import { Router } from "express";

import userRoute from "./user";
import userProfileRoute from "./user-profile";
import userPermissionRoute from "./user-permission";
import userRole from "./user-role";


import activityRoute from "./activity";
import activityTypeRoute from "./activity-type";
import activityQuestionRoute from "./activity-question";
import activitySubmissionRoute from "./activity-submission"

import courseRoute from "./course";

import learningMaterialRoute from "./learning-material";

const router = Router();

router.use("/users", userRoute);
router.use("/user-profiles", userProfileRoute);
router.use("/user-permissions", userPermissionRoute);
router.use("/user-role", userRole);

router.use("/activities", activityRoute);
router.use("/acitvity-types", activityTypeRoute);
router.use("/activity-questions", activityQuestionRoute);
router.use("/activity-submissions", activitySubmissionRoute);

router.use("/courses", courseRoute);

router.use("/learning-materials", learningMaterialRoute);


export default router;