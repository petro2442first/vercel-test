import { Router } from "express";

import { AuthMiddleware } from "../middleware/auth.middleware.js";
import userRoute from "./user.route.js";
import authRoute from "./auth.route.js";
import paymentRoute from "./payment.route.js";

const router = Router();

router.use("/auth", userRoute);
// router.use("/auth", authRoute);
router.use("/payment", paymentRoute);

export default router;
