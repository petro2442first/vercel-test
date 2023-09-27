import { Router } from "express";

import PaymentController from "../controllers/payment.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/payment-details",
  AuthMiddleware,
  PaymentController.getPaymentDetails
);

router.post(
  "/transaction-info",
  AuthMiddleware,
  PaymentController.confirmedCallback
);

router.get("/get-fee", PaymentController.getFee);

router.get("get-value-with-fee", PaymentController.getValueWithFee);

export default router;
