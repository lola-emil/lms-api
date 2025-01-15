import { Router } from "express";

import userRoute from "./user";

const router = Router();

router.get("/", (req, res) => {
    res.json({
        message: "Welcome to the API"
    });
});

router.use("/users", userRoute);

export default router;