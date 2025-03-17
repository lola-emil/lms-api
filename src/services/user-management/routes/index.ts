import { Router } from "express";

import userRoute from "./user.route";
import userRoleRoute from "./user-role.route";

const router = Router();

router.use("/users", userRoute);
router.use("/user-roles", userRoleRoute);

export default router;