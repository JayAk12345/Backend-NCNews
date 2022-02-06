const {
  fetchArticleById,
  patchArticleVote,
} = require("../models/articleModel");

exports.getArticleById = (req, res, next) => {
  const { article_id: id } = req.params;

  fetchArticleById(id)
    .then((response) => {
      if (response === undefined) {
        res.status(404).send({ msg: "Not found" });
      } else {
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateArticleVote = (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id: id } = req.params;
  console.log("IN COMTROLLER");
  patchArticleVote(inc_votes, id)
    .then((response) => {
      console.log("ARTICLE THEN");
      res.status(201).send(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
};
