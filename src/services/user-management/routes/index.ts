import { Router } from "express";

import userRoute from "./user.route";
import userProfileRoute from "./user-profile.route";

const router = Router();

router.use("/users", userRoute);
router.use("/users-profiles", userProfileRoute);

export default router;