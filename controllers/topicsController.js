const { fetchTopics } = require("../models/topicsModel");

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((response) => {
      let returnObj = { topics: response };
      res.status(200).send(returnObj);
    })
    .catch((err) => {
      next(err);
    });
};
