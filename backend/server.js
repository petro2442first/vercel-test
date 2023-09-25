import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import tgBot from "./app/bot";
import router from "./app/routes";
import dbConfig from "./app/config/db.config";
import PaymentController from "./app/controllers/payment.controller";

const jsonParser = bodyParser.json();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

const defaultPort = 8888;
const PORT = process.env.PORT || defaultPort;

app.use(cors());

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/client/build/index.html`);
});

app.use("/api", jsonParser, router);

tgBot();

async function start() {
  try {
    // await mongoose.connect(dbConfig.db_connect, {
    //   useUnifiedTopology: true,
    // });
    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}...`);

      PaymentController.getAddress();
    });
  } catch (err) {
    console.error("Database connect error: ", err.message);
    process.exit(1);
  }
}
start();
