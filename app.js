const express = require("express");
const {
  handleBadUrls,
  handle500Errors,
  handle400Errors,
} = require("./controllers/errorController");
const apiRouter = require("./routers/apiRouter");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.use("*", handleBadUrls);

app.use(handle400Errors);

app.use(handle500Errors);

module.exports = app;
