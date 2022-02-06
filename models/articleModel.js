const db = require("../db/connection");

exports.fetchArticleById = (id) => {
  let queryStr = `SELECT articles.*,
  COUNT(comments.comment_id) AS comment_count
  FROM articles 
  LEFT JOIN comments 
  ON articles.article_id = comments.article_id
  WHERE articles.article_id = $1
  GROUP BY articles.article_id
  ;`;
  const queryParams = [id];

  return db.query(queryStr, queryParams).then((res) => {
    return res.rows[0];
  });
};

exports.patchArticleVote = (inc_votes, id) => {
  let queryStr = `UPDATE articles
  SET votes = votes + $2
  WHERE articles.article_id = $1
  RETURNING *;`;
  const queryParams = [id, inc_votes];
  console.log("IN MODEL");

  return db.query(queryStr, queryParams).then((res) => {
    console.log("IN RETURN OF MODEL");
    if (res.rows[0] === undefined) {
      console.log("IN MODEL RETURN IF");
      return Promise.reject({
        status: 404,
        msg: "Not found",
      });
    } else {
      console.log(res.rows[0], "MODEL RETURN ELSE");
      return res.rows[0];
    }
  });
};
