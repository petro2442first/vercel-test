import { Router } from "express";
import bodyParser from "body-parser";

import PaymentController from "../controllers/payment.controller.js";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
import { BlockBeeApi } from "../libs/blockbee-api.js";

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
  const bb = new BlockBeeApi({
    userId: req.query.userid,
    url: "https://rocket-web-c7e333242ae0.herokuapp.com/api/payment/transaction-info",
  });
  const details = await bb.getPaymentDetails(4);
  // const params = bb.bb.bbParams;
  // console.log(params);
  // console.log(details);

  const html = /* html */ `
    <p>${details.address}</p>
    <img src="data:image/png;base64,${details.qrCode}">
    <p>Amount: ${details.amount.withFee} USDT TRC-20</p>
    <p>Amount without fee: ${details.amount.withoutFee} USDT TRC-20</p>
  `;
  res.send(html);
});

export default router;
