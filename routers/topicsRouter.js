const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topicsController");
const { handleBadUrls } = require("../controllers/errorController");

console.log("in topic router");
topicsRouter.route("/").get(getTopics);

topicsRouter.use("*", handleBadUrls);

module.exports = topicsRouter;
