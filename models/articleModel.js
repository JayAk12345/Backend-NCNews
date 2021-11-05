const db = require("../db/connection");

exports.fetchArticleById = (id) => {
  console.log("in model");

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
