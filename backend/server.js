const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const router = require("./app/routes");

const defaultPort = 8888;

global.__rootDir = __dirname; 

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
