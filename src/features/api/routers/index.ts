import { Router } from "express";

import userRoute from "./user";
import userProfileRoute from "./user-profile";
import userPermissionRoute from "./user-permission";
import userRole from "./user-role";

const router = Router();

router.use("/users", userRoute);
router.use("/user-profiles", userProfileRoute);
router.use("/user-permissions", userPermissionRoute);
router.use("/user-role", userRole);

export default router;