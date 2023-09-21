import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";

import router from "./app/routes";

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

app.use('/api', jsonParser, router);

//require(path.join(__dirname, "app/bot/index.js"))();


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
