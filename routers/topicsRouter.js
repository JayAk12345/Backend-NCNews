const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topicsController");

console.log("in topic router");
topicsRouter.route("/").get(getTopics);

module.exports = topicsRouter;
