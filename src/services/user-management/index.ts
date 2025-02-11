import { Router } from "express";
import userRoute from "./routes/user.route";

const router = Router();

router.use("/users", userRoute);
export default router;