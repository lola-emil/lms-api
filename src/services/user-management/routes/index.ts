import { Router } from "express";

import userRoute from "./user.route";
import userProfileRoute from "./user-profile.route";
import userRoleRoute from "./user-role.route";

const router = Router();

router.use("/users", userRoute);
router.use("/users-profiles", userProfileRoute);
router.use("/user-roles", userRoleRoute);

export default router;