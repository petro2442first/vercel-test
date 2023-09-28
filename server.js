import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";

import tgBot from "./app/bot";
import router from "./app/routes";
import dbConfig from "./app/config/db.config";

const jsonParser = bodyParser.json();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

const defaultPort = 8888;
const PORT = process.env.PORT || defaultPort;

app.use(
  cors(/* {
    origin: "http://127.0.0.1:5500",
  } */)
);
app.use(session({ secret: "rocketcall", cookie: { maxAge: 60000 } }));

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/client/build/index.html`);
});

app.use("/api", jsonParser, router);

// tgBot();

async function start() {
  try {
    await mongoose.connect(dbConfig.db_connect, {
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}...`);
    });
  } catch (err) {
    console.error("Database connect error: ", err.message);
    process.exit(1);
  }
}
start();
