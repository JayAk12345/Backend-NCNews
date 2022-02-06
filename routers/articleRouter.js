const articleRouter = require("express").Router();
const {
  getArticleById,
  updateArticleVote,
  getArticles,
} = require("../controllers/articleController");

articleRouter.route("/:article_id").get(getArticleById);
articleRouter.route("/:article_id").patch(updateArticleVote);
articleRouter.route("/").get(getArticles);

module.exports = articleRouter;
