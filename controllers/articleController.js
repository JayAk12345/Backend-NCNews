const {
  fetchArticleById,
  patchArticleVote,
} = require("../models/articleModel");

exports.getArticleById = (req, res, next) => {
  console.log("in controller");

  const { article_id: id } = req.params;
  console.log(typeof id, "OLD CHECK");

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
  console.log("in controller");
  const { inc_votes } = req.body;
  const { article_id: id } = req.params;
  console.log(typeof inc_votes, typeof id, "TYPES");

  patchArticleVote(inc_votes, id)
    .then((response) => {
      res.status(201).send(response);
    })
    .catch((err) => {
      console.log(err, "catch error");
      next(err);
    });
};
