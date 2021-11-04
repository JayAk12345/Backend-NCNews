const articleRouter = require("express").Router();
const { getArticleById } = require("../controllers/articleController");

//console.log("ARTICLE ROUTER")
articleRouter.route("/:article_id").get(getArticleById);

module.exports = articleRouter;
