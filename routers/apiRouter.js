const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter");
const articleRouter = require("./articleRouter");

//console.log("in api router");
apiRouter.use("/topics", topicsRouter);

apiRouter.use("/articles", articleRouter);

module.exports = apiRouter;
