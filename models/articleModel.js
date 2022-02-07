const db = require("../db/connection");
const { sanitiseSortBy } = require("../utilFunctions/sanitiseSortBy");
const { sanitiseOrder } = require("../utilFunctions/sanitiseOrder");

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

  return db.query(queryStr, queryParams).then((res) => {
    if (res.rows[0] === undefined) {
      return Promise.reject({
        status: 404,
        msg: "Not found",
      });
    } else {
      return res.rows[0];
    }
  });
};

exports.fetchArticles = ({ sort_by = "created_at", order = "desc", topic }) => {
  console.log("IN MODEL");
  const queryParams = [];
  console.log(order);
  const sanitisedOrder = sanitiseOrder(order);
  const sanitisedSortBy = sanitiseSortBy(sort_by);

  let queryStr = `SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles
  LEFT JOIN comments ON comments.article_id = articles.article_id`;

  if (topic !== undefined) {
    queryStr += `WHERE articles.topic ILIKE $1`;
    queryParams.push(topic);
  }

  queryStr += `
  GROUP BY articles.article_id 
  ORDER BY ${sanitisedSortBy} ${sanitisedOrder};`;

  return db.query(queryStr, queryParams).then((res) => {
    // console.log(res.rows, "MODEL RES");
    return res.rows;
  });
};
