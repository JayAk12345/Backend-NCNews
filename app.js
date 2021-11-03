const express = require("express");
const { handleBadUrls } = require("./controllers/errorController");
const apiRouter = require("./routers/apiRouter");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

app.use("*", handleBadUrls);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("error");
});

module.exports = app;
