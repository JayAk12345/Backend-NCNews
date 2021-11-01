const db = require("../connection");
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
    })
    .then(() => {
      const querySTR = format(
        `INSERT INTO topic (slug, description) VALUES %L RETURNING *;`,
        topicData.map((topic) => {
          return [topic.slug, topic.description];
        })
      );
      return db.query(querySTR);
    })
    .then(() => {
      const querySTR = format(
        `INSERT INTO user (username, avatar_url, name) VALUES %L RETURNING *;`,
        userDATA.map((user) => {
          return [user.username, user.avatar_url, user.name];
        })
      );
      //return
      db.query(querySTR);
    });
  .then(() => {
    const formattedArticleData = articleData.map(article) => {
      let topic = generateTopic(article, topicData);
      let author = generateAuthor(article, userData);
      return {
        "article_id": article.article_id,
        "title": article.title,
        "body": article.body,
        "votes": 0,
        "topic": topic,
        "author": author,
        "created_at": time_stamp
      }
    });
  });
};

module.exports = seed;
