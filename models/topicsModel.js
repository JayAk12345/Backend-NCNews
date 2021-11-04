const db = require("../db/connection");

exports.fetchTopics = () => {
  return db
    .query(`SELECT * FROM topics`)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      return Promise.reject({ status: 404, msg: "Not found" });
    });
};
