const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topicsController");

topicsRouter.use("/", getTopics);
