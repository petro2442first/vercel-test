import { Router } from "express";

import PaymentController from "../controllers/payment.controller";

const router = Router();

router.get("/transaction-info", PaymentController.getTransactionInfo);

export default router;
