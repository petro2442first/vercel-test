import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import router from "./app/routes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

const defaultPort = 8888;

app.use(cors());

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/client/build/index.html`);
});

app.use('/api', router);

require(path.join(__dirname, "app/bot/index.js"))();

const PORT = process.env.PORT || defaultPort;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
