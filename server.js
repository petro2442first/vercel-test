const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
global.__rootDir = __dirname;

app.use(cors());

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});
app.get("*", (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

// set port, listen for requests
const PORT = process.env.PORT || 11111;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
