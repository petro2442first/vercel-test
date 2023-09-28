import dotenv from "dotenv";
import { BlockBeeApi } from "../libs/blockbee-api";

import Transaction from "../models/transaction.model";

dotenv.config();

export default class PaymentController {
  static async getPaymentDetails(req, res) {
    const { value } = req.body;

    value = parseFloat(value);
    try {
      const bb = await new BlockBeeApi();

      const paymentDetails = await bb.getPaymentDetails(value);

      res.status(200).json(paymentDetails);
    } catch (err) {
      res.status(500).json({
        message: `Something went wrong, please, try again..
          ${err.message}`,
      });
    }

    // bb.checkLogs().then(console.log);
  }

  static async confirmedCallback(req, res) {
    const { pending } = req.body;
    try {
      if (!pending) {
        const userId = req.user.userId;
        const { uuid, value_coin, value_forwarded_coin } = req.body;

        const candidate = await Transaction.findOne({ uuid });

        if (candidate) {
          return res
            .status(400)
            .json({ message: "This transaction is already exists" });
        }

        const transaction = new Transaction({
          uuid,
          userId,
          valueWithoutFee: value_coin,
          valueWithFee: value_forwarded_coin,
        });

        await transaction.save();

        // Mor Api

        // --------

        req.session.transaction = uuid;
        console.log("callback");
        res.status(200);
      }
    } catch (err) {
      res.status(500).json({
        message: `Something went wrong, please, try again..
          ${err.message}`,
      });
    }
  }

  static async getTransactionInfo(req, res) {
    if (req.session.transaction) {
      try {
        const transaction = await Transaction.findOne({
          uuid: req.session.transaction,
        });

        if (!transaction) {
          res.status(200).json({
            status: "pending",
          });
        }

        res.status(200).json({
          status: "success",
          transaction,
        });
      } catch (err) {
        res.status(500).json({
          message: `Something went wrong...
          ${err.message}`,
        });
      }
    }
  }
  static async getFee(req, res) {
    try {
      const fee = await BlockBeeApi.getFee();
      res.status(200).json(fee);
    } catch (err) {
      res.status(500).json({
        message: `Something went wrong...
        ${err.message}`,
      });
    }
  }
  static async getValueWithFee(req, res) {
    const { value } = req.body;

    try {
      const fee = await BlockBeeApi.getFee();
      value = value * (1 + parseFloat(fee));
      res.status(200).json(value);
    } catch (err) {
      res.status(500).json({
        message: `Something went wrong...
        ${err.message}`,
      });
    }
  }
}

// PaymentController.getAddress();
