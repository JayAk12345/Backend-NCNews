const db = require("../db/connection");

exports.fetchTopics = () => {
  console.log("in model");
  return db.query(`SELECT * FROM topics`).then((res) => {
    console.log(res.rows, "in model");
    return res.rows;
  });
};
