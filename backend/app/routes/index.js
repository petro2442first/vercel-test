import { Router } from "express";
import userRoute from "./user.route";
import authRoute from "./auth.route";
import bodyParser from "body-parser";

const router = Router();

router.use("/auth", userRoute);
// router.use("/auth", authRoute);

export default router;
