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

    const fee = await BlockBeeApi.getFee();

    value = value * (1 + fee / 100);

    // console.log({
    //   address,
    //   qrCode: qrCode.qr_code,
    //   amount: value,
    // });
    return {
      address,
      qrCode: qrCode.qr_code,
      amount: value,
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
      return err.message;
    }
  }
}