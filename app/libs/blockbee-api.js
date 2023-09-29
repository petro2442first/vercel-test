import dotenv from "dotenv";
import BlockBee from "@blockbee/api";
import fetch from "node-fetch";

dotenv.config();

const apiKey = process.env.BLOCKBEE_API_KEY;

const defaultCoin = "trc20_usdt";
const callbackUrl = "http://localhost:8812/api/payment/transaction-info";

export class BlockBeeApi {
  constructor(user_id, url = null) {
    this.bb = new BlockBee(
      defaultCoin,
      "",
      url ?? callbackUrl,
      {
        userId: user_id,
      },
      {
        // post: 1,
      },
      apiKey
    );
  }
  async getPaymentDetails(value) {
    const address = await this.bb.getAddress();

    const fee = await BlockBeeApi.getFee();
    value = value * (1 + fee / 100);

    const qrCode = await this.bb.getQrcode(value);

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
