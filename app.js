const express = require("express");
const { handleBadUrls } = require("./controllers/errorController");
const apiRouter = require("./routers/apiRouter");

const app = express();
app.use(express.json());

app.get("/api", apiRouter);

app.use("*", handleBadUrls);

module.exports = app;
