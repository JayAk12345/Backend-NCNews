const db = require("../data");
const format = require("pg-format");

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables
  // 2. insert data
  return db
    .query("DROP TABLE IF EXISTS topic;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS user;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS article;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS comment");
    })
    .then(() => {
      return db.query(
        `CREATE TABLE topic (
          slug VARCCHAR PRIMARY KEY NOT NULL, 
          description VARCHAR NOT NULL
          );`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE user (
          username VARCHAR PRIMARY KEY NOT NULL, 
          avatar_url VARCHAR, 
          name VARCHAR);`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE article (
          article_id SERIAL PRIMARY KEY, 
          title VARCHAR NOT NULL, 
          body VARCHAR NOT NULL, 
          votes INT, 
          topic VARCHAR NOT NULL REFERENCES topic(slug), 
          author VARCHAR PRIMARY KEY NOT NULL REFERENCES user(username), 
          created_at TIMESTAMP)`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE comment (
          comment_id SERIAL PRIMARY KEY, 
          author VARCHAR PRIMARY KEY NOT NULL REFERENCES user(username), 
          articel_id PRIMARY KEY REFERENCES article(article_id), 
          votes INT, 
          created_at TIMESTAMP, 
          body VARCHAR NOT NULL)`
      );
    });
};

module.exports = seed;
