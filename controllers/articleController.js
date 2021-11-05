const { fetchArticleById } = require("../models/articleModel");

exports.getArticleById = (req, res, next) => {
  console.log("in controller");

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
