const express = require("express");
const cors = require("cors");
const path = require("path");
const { AuthRouter } = require("./app/routes/auth.routes");

const app = express();

const PORT = process.env.PORT || 11111;
global.__rootDir = __dirname;

app.use(cors());
app.use(express.json({ extended: true }));

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

app.get("*", (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

app.use("/api/auth", AuthRouter);

async function start() {
  try {
    await mongoose.connect(config.get("db_connect"), {
      useUnifiedTopology: true,
    });
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (err) {
    console.error("Database connect error: ", err.message);
    process.exit(1);
  }
}
start();

require(path.join(__dirname, "/app/bot/index.js"))();

// set port, listen for requests
