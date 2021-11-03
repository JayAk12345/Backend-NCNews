const express = require("express");
const {
  handleBadUrls,
  handle500Errors,
} = require("./controllers/errorController");
const apiRouter = require("./routers/apiRouter");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

app.use("*", handleBadUrls);

app.use(handle500Errors);

module.exports = app;
