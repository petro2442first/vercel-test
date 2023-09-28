import { Router } from "express";
import bodyParser from "body-parser";

import PaymentController from "../controllers/payment.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { BlockBeeApi } from "../libs/blockbee-api";

const router = Router();
const jsonParser = bodyParser.json();

router.post(
  "/payment-details",
  AuthMiddleware,
  PaymentController.getPaymentDetails
);

router.post(
  "/transaction-info",
  jsonParser,
  PaymentController.confirmedCallback
);
router.get("/check-transaction", PaymentController.getTransactionInfo);

router.get("/get-fee", PaymentController.getFee);

router.get("/get-value-with-fee", PaymentController.getValueWithFee);

router.get("/test-payment", async (req, res) => {
  const bb = new BlockBeeApi(
    1,
    "https://rocket-web-c7e333242ae0.herokuapp.com/api/payment/transaction-info"
  );
  const details = await bb.getPaymentDetails(1);
  // console.log(details);
  const html = /* html */ `
    <p>${details.address}</p>
    <img src="data:image/png;base64,${details.qrCode}">
    <p>Amount: ${details.amount} USDT TRC-20</p>
  `;
  res.send(html);
});

export default router;
