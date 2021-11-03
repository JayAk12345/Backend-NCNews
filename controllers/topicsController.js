const { fetchTopics } = require("../models/topicsModel");

exports.getTopics = (req, res, next) => {
  console.log("in controller");
  fetchTopics().then((response) => {
    let returnObj = { topics: response };
    console.log(returnObj, "controller");
    res.status(200).send(returnObj);
  });
};
