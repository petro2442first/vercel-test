import dotenv from "dotenv";
import { BlockBeeApi } from "../libs/blockbee-api.js";

import Transaction from "../models/transaction.model.js";
import { MorApi } from "../libs/mor-api.js";
import User from "../models/user.model.js";

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
        const { uuid, value_coin, value_forwarded_coin } = req.body;
        const userId = req.query.userId;
        const hash = req.query.hash;

        const candidate = await Transaction.findOne({ uuid });

        if (candidate) {
          return res.status(400).send("This transaction is already exists");
        }

        const transaction = new Transaction({
          uuid,
          hash,
          userId,
          valueWithoutFee: value_coin,
          valueWithFee: value_forwarded_coin,
        });

        await transaction.save();

        // Mor Api

        const currentUser = await User.findById(userId);

        if (currentUser) {
          currentUser.balance += value_forwarded_coin;

          const morUserId = currentUser.morId;

          // const morRequest = await MorApi.updateBalance({
          //   userId: morUserId,
          //   balance,
          // });

          const morRequest = await MorApi.createPayment({
            userId: morUserId,
            amount: value_forwarded_coin,
            uuid,
          });

          if (morRequest.error) {
            throw new Error(
              `The balance has not been updated. ${response.error}`
            );
          }

          await currentUser.save();
        } else {
          throw new Error("User not found");
        }

        // --------

        req.session.transaction = uuid;
      }
      res.status(200).send("*ok*");
    } catch (err) {
      res.status(500).send(err.message);
    }
    console.log("Body: ", req.body);
    console.log("Query: ", req.query);
  }

  static async getTransactionInfo(req, res) {
    try {
      const { hash } = req.body;
      const transaction = await Transaction.findOne({
        hash,
      }).exec();

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
      res.status(500);
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
      value = await BlockBeeApi.getValueWithFullFee(value);
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
