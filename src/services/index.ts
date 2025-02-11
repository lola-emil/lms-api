import { Router } from "express";
import userManagement from "./user-management/routes";

const router = Router();

router.use("/user-management", userManagement)

export default router;