import { Router } from "express";

import { AuthMiddleware } from "../middleware/auth.middleware";
import userRoute from "./user.route";
import authRoute from "./auth.route";
import paymentRoute from "./payment.route";

const router = Router();

router.use("/auth", userRoute);
// router.use("/auth", authRoute);
router.use("/payment", paymentRoute);

export default router;
