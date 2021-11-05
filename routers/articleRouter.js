const articleRouter = require("express").Router();
const {
  getArticleById,
  updateArticleVote,
} = require("../controllers/articleController");

articleRouter.route("/:article_id").get(getArticleById);
articleRouter.route("/:article_id").patch(updateArticleVote);

module.exports = articleRouter;
