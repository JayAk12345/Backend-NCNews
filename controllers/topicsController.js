const { fetchTopics } = require("../models/topicsModel");

exports.getTopics = (req, res) => {
  fetchTopics().then((response) => {
    let returnObj = { topics: response };
    res.status(200).send(returnObj);
  });
};
