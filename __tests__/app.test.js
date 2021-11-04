const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");
const {
  topicData: topicDataTest,
  userData: userDataTest,
  articleData: articleDataTest,
  commentData: commentDataTest,
} = testData;

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/wrongpath", () => {
  describe("GET", () => {
    it("status:404, returns error message when incorrect URL is entered", () => {
      return request(app)
        .get("/api/wrongpath")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Not found");
        });
    });
  });
});

describe("/api/topics", () => {
  describe("GET", () => {
    it("status(200), returns all topics in the correct structure of an object with a key of what is being returned and a value of an array of topic objects", () => {
      let correctStructure = { topics: topicDataTest };
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          expect(typeof res.body).toBe("object");
          expect(res.body.length).toBe(undefined);
          expect(res.body).toEqual(correctStructure);
        });
    });
    it("status(404) returns error message of Not found", () => {
      return request(app)
        .get("/api/topi")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Not found");
        });
    });
  });
});

describe("/api/articles/:article_id", () => {
  describe("GET", () => {
    it("returned object has all necessary properties", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then((res) => {
          let props = [
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes",
          ];
          let returnedArticle = res.body;
          let hasAllProps = props.every((prop) =>
            returnedArticle.hasOwnProperty(prop)
          );
          expect(hasAllProps).toBe(true);
        });
    });
    it("returns obj with correct article id and correct structure", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then((res) => {
          console.log(res.body, "TEST");
          expect(res.body.article_id).toBe(2);
          expect(res.body).toEqual({
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: new Date(1594329060000),
            votes: 100,
          });
        });
    });
  });
});

// returns correct structure
//returned obj has all necessary properties
// returns obj with correct article ID
// correct comment count
