import dotenv from "dotenv";
import BlockBee from "@blockbee/api";
import fetch from "node-fetch";

dotenv.config();

const apiKey = process.env.BLOCKBEE_API_KEY;

const defaultCoin = "trc20_usdt";
const callbackUrl = "http://localhost:8812/transaction-info";

export class BlockBeeApi {
  constructor(url = null) {
    this.bb = new BlockBee(
      defaultCoin,
      "",
      url ?? callbackUrl,
      {},
      {
        post: 1,
      },
      apiKey
    );
  }
  async getPaymentDetails(value) {
    const address = await this.bb.getAddress();

    const qrCode = await this.bb.getQrcode(value);

    return {
      address,
      qrCode: qrCode.qr_code,
      amount: value,
    };
  }
  static async getFee() {
    try {
      const query = new URLSearchParams({ prices: "0" }).toString();

      const resp = await fetch(`https://api.blockbee.io/info/?${query}`, {
        method: "GET",
      });

      const data = await resp.json();

      return data.btc.fee_percent;
    } catch (err) {
      return err;
    }
  }
}
