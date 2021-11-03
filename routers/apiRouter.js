const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter");
const { handleBadUrls } = require("../controllers/errorController");

console.log("in api router");
apiRouter.use("/topics", topicsRouter);

apiRouter.use("*", handleBadUrls);

module.exports = apiRouter;
