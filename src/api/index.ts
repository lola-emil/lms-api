import { Router } from "express";

import userRoleRoute from "./routes/user-role.route";
import userRolePermissionRoute from "./routes/user-role-permission.route";
import userRoute from "./routes/user.route";
import classLevelRoute from "./routes/class-level.route";
import classSectionRoute from "./routes/class-section.route";


const router = Router();


router.use("/users", userRoute);
router.use("/user-roles", userRoleRoute);
router.use("/user-role-permissions", userRolePermissionRoute);
router.use("/class-levels", classLevelRoute);
router.use("/class-sections", classSectionRoute);

export default router;