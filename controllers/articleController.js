const { fetchArticleById } = require("../models/articleModel");

exports.getArticleById = (req, res) => {
  console.log("in controller");
  const { article_id: id } = req.params;
  console.log(req.params, "REQ");
  fetchArticleById(id).then((response) => {
    res.status(200).send(response);
  });
};
