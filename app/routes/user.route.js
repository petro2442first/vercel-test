import express from "express";
import { MorApi } from "../libs/mor-api.js";

const router = express.Router();

router.route("/login").post(async function (request, response) {
  const {
    body: { username, password },
  } = request;
  const morRequest = await MorApi.login({ username, password });

  console.log("{ username, password }", request.body);

  request.session.morUserId = request.body.action.user_id;

  return response.send(morRequest);
});

router.route("/logout").post(async function (request, response) {
  const {
    body: { username },
  } = request;
  const morRequest = await MorApi.logout({ username });

  return response.send(morRequest);
});

router.route("/quickstat").post(async function (request, response) {
  const {
    body: { username },
  } = request;
  const morRequest = await MorApi.getQuickStat({ username });

  return response.send(morRequest);
});

router.get("/get-balance/:username", async (req, res) => {
  const username = req.params.username;

  const morRequest = await MorApi.getBalance({ username });

  res.status(200).json(morRequest);
});

export default router;
