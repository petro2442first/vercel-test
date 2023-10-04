import dotenv from "dotenv";
import BlockBee from "@blockbee/api";
import fetch from "node-fetch";
import crypto from "crypto";

dotenv.config();

const apiKey = process.env.BLOCKBEE_API_KEY;

const defaultCoin = "trc20_usdt";
const defaultFee = 1.0;
const callbackUrl = "http://localhost:8812/api/payment/transaction-info";

export class BlockBeeApi {
  constructor({ userId, url }) {
    this.hash = BlockBeeApi.generateHash(userId);
    this.bb = new BlockBee(
      defaultCoin,
      "",
      url ?? callbackUrl,
      {
        userId,
        hash: this.hash,
      },
      {
        post: 0,
      },
      apiKey
    );
  }

  async getPaymentDetails(value) {
    const address = await this.bb.getAddress();
    const valueWithFee = await BlockBeeApi.getValueWithFullFee(value);
    const qrCode = await this.bb.getQrcode(valueWithFee);
    return {
      address: address,
      qrCode: qrCode.qr_code,
      amount: {
        withFee: valueWithFee,
        withoutFee: value,
      },
      hash: this.hash,
    };
  }

  static async getFee() {
    try {
      let fee = 0;
      const query = new URLSearchParams({ prices: "0" });
      query.append("apikey", apiKey);
      const resp = await fetch(
        `https://api.blockbee.io/trc20/usdt/info/?${query.toString()}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          fee = data.fee_percent;
        });

      return parseFloat(fee);
    } catch (err) {
      console.err(err.message, "\nReturned default fee");
      return defaultFee;
    }
  }

  static async getEstimate() {
    const estimate = await BlockBee.getEstimate(defaultCoin, apiKey);

    return estimate.estimated_cost / 10;
  }

  static async getValueWithFee(value) {
    const fee = await BlockBeeApi.getFee();

    value = value * (1 + fee / 100);

    return value;
  }

  static async getValueWithFullFee(value) {
    value = await BlockBeeApi.getValueWithFee(value);
    value += await BlockBeeApi.getEstimate();

    return value;
  }

  static generateHash(userId) {
    const currentDateTime = new Date().toISOString();

    const dataToHash = userId + currentDateTime;

    const hash = crypto.createHash("md5").update(dataToHash).digest("hex");

    const shortHash = hash.slice(0, 12);

    return shortHash;
  }
}
