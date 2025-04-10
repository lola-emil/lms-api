import { Router } from "express";
import userRoute from "./users/user.route";
import userProfileRoute from "./user-profiles/user-profile.route";
import userRoleRoute from "./user-roles/user-roles.route";

const router = Router();

router.use("/users", userRoute);
router.use("/user-profiles", userProfileRoute);
router.use("/user-roles", userRoleRoute);

export default router;