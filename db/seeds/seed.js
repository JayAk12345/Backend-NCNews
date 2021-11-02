const db = require("../connection");
const format = require("pg-format");

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables
  // 2. insert data
  return db
    .query("DROP TABLE IF EXISTS comments")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS articles;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS topics;");
    })
    .then(() => {
      return db.query(
        `CREATE TABLE topics (
          slug VARCHAR PRIMARY KEY NOT NULL, 
          description VARCHAR NOT NULL
          );`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE users (
          username VARCHAR PRIMARY KEY NOT NULL, 
          avatar_url VARCHAR, 
          name VARCHAR);`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE articles (
          article_id SERIAL PRIMARY KEY NOT NULL, 
          title VARCHAR NOT NULL, 
          body VARCHAR NOT NULL, 
          votes INT, 
          topic VARCHAR NOT NULL REFERENCES topics(slug), 
          author VARCHAR NOT NULL REFERENCES users(username), 
          created_at TIMESTAMP)`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY, 
          author VARCHAR NOT NULL REFERENCES users(username), 
          article_id INT REFERENCES articles(article_id), 
          votes INT, 
          created_at TIMESTAMP, 
          body VARCHAR NOT NULL)`
      );
    })
    .then(() => {
      const querySTR = format(
        `INSERT INTO topics (slug, description) VALUES %L RETURNING *;`,
        topicData.map((topic) => {
          return [topic.slug, topic.description];
        })
      );

      return db.query(querySTR);
    })
    .then(() => {
      const querySTR = format(
        `INSERT INTO users (username, avatar_url, name) VALUES %L RETURNING *;`,
        userData.map((user) => {
          return [user.username, user.avatar_url, user.name];
        })
      );
      return db.query(querySTR);
    })
    .then(() => {
      const querySTR = format(
        `INSERT INTO articles (title, body, votes, topic, author, created_at) VALUES %L RETURNING *;`,
        articleData.map((article) => {
          return [
            article.title,
            article.body,
            article.votes || 0,
            article.topic,
            article.author,
            article.created_at,
          ];
        })
      );
      return db.query(querySTR);
    })
    .then(() => {
      const querySTR = format(
        `INSERT INTO comments (author, article_id, votes, created_at, body) VALUES %L RETURNING *;`,
        commentData.map((comment) => {
          return [
            comment.author,
            comment.article_id,
            comment.votes || 0,
            comment.created_at,
            comment.body,
          ];
        })
      );
      return db.query(querySTR);
    });
};

module.exports = seed;
