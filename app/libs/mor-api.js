import dotenv from "dotenv";
import fetch from "node-fetch";
import sha1 from "sha1";
import { parseString as parseXml } from "xml2js";
import { prepareParsedJson } from "../helpers/prepare-parsed-json-after-xml";

dotenv.config();

const apiKey = process.env.MOR_API_KEY;

const apiUrl = (endpoint) =>
  new URL(`http://116.203.41.231/billing/api/${endpoint}`);

const request = ({
  url,
  params = {},
  body = {},
  method = "GET",
  headers = {},
}) =>
  new Promise(async (resolve, reject) => {
    url = apiUrl(url);

    const hash = sha1("".concat(...Object.entries(params), apiKey));
    let stringForHash = "";
    for (const [key, value] in Object.entries(params)) {
      url.searchParams.append(key, value);
    }
    url.searchParams.append("hash", hash);

    console.log(url);

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify({
        u: params.username,
        hash,
      }),
    });
    const data = await response.text();

    parseXml(data, { trim: true }, (error, result) => {
      const preparedObject = prepareParsedJson(result);
      resolve(preparedObject);
    });
  });

export class MorApi {
  static login({ username, password }) {
    return new Promise(async (resolve, reject) => {
      const url = apiUrl("user_login");
      const hash = sha1("".concat(username, password, apiKey));

      url.searchParams.append("u", username);
      url.searchParams.append("p", password);
      url.searchParams.append("hash", hash);

      const response = await fetch(url);
      const data = await response.text();

      console.log("u", username);
      console.log("p", password);
      console.log("hash", hash);

      console.warn("response::", response);

      parseXml(data, { trim: true }, (error, result) => {
        const preparedObject = prepareParsedJson(result.action);
        resolve(preparedObject);
        // if (preparedObject.status === 'ok') {

        // }

        // reject(preparedObject);
      });
    });
  }

  static logout({ username }) {
    return new Promise(async (resolve, reject) => {
      const url = apiUrl("user_logout");
      const hash = sha1("".concat(apiKey));

      url.searchParams.append("u", username);
      url.searchParams.append("hash", hash);

      const response = await fetch(url);
      const data = await response.text();

      console.log("u", username);
      console.log("hash", hash);

      parseXml(data, { trim: true }, (error, result) => {
        console.log(result);
        const preparedObject = prepareParsedJson(result);
        resolve(preparedObject);
      });
    });
  }

  static getQuickStat({ username }) {
    // user
    return new Promise(async (resolve, reject) => {
      const url = apiUrl("quickstats_get");
      const hash = sha1("".concat(username, apiKey));

      url.searchParams.append("u", username);
      url.searchParams.append("hash", hash);

      const response = await fetch(url, { method: "POST" });
      const data = await response.text();

      console.log("u", username);
      console.log("hash", hash);

      parseXml(data, { trim: true }, (error, result) => {
        console.log(result);
        const preparedObject = prepareParsedJson(result);
        resolve(preparedObject);
      });
    });
  }

  static async getBalance({ username }) {
    const req = await request({
      url: "user_balance_get",
      method: "POST",
      params: {
        u: username,
      },
    });

    if (req.page.error) {
      return {
        error: req.page.error,
      };
    } else if (req.status.error) {
      return {
        error: req.status.error,
      };
    }

    return req.page.balance;
  }
  static async updateBalance({ userId, balance }) {
    // transaction add!!!!
    const req = await request({
      url: "user_balance_update",
      method: "POST",
      params: {
        user_id: userId,
        balance,
      },
    });
    if (req.page.error) {
      return {
        error: req.page.error,
      };
    } else if (req.status.error) {
      return {
        error: req.status.error,
      };
    }
    return req.page.page;
  }
  static async createPayment({ userId, amount, uuid, hash }) {
    const userDetails = await request({ userId });
    if (userDetails.error) {
      return {
        error: userDetails.error,
      };
    }

    const username = userDetails.other_details.username;
    const req = await request({
      url: "payment_create",
      method: "POST",
      params: {
        user_id: userId,
        amount,
        p_currency: "USD",
        transaction: uuid,
        comments_for_user: uuid,
        u: username,
      },
    });

    if (req.error) {
      return { error: req.error };
    }
    return req.page.response;
  }
  static async getUserDetails({ userId }) {
    const req = await request({
      url: "user_details_get",
      method: "POST",
      params: {
        user_id: userId,
      },
    });

    if (req.error) {
      return {
        error: req.error,
      };
    }

    return req.page.details;
  }
}

// MorApi.login({username: '1011111111', password: 'ehF8km956PRf*G)!'}).then(console.log);
