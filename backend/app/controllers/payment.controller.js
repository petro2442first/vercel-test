import dotenv from "dotenv";
import BlockBee from "@blockbee/api";

dotenv.config();

const apiKey = process.env.BLOCKBEE_API_KEY;

const bb = new BlockBee(
  "trc20_usdt",
  "",
  "http://localhost:8812/transaction-info",
  {},
  {
    post: 1,
  },
  apiKey
);

// console.log(apiKey);
export default class PaymentController {
  static async getAddress() {
    const address = await bb.getAddress();
    console.log("Payment address: ", address);
    console.log(bb.checkLogs());
  }

  static getTransactionInfo(req, res) {
    const body = req.body;

    console.log(body);
  }
}

// PaymentController.getAddress();
