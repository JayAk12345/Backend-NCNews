const apiRouter = require("express").Router();
const topicsRouter = require("./topicRouter");

apiRouter.use("/topics", topicsRouter);

module.exports = apiRouter;
