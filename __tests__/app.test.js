const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");
const articleRouter = require("../routers/articleRouter.js");
const articles = require("../db/data/test-data/articles.js");
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
          const props = [
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes",
          ];
          const returnedArticle = res.body;
          const hasAllProps = props.every((prop) =>
            returnedArticle.hasOwnProperty(prop)
          );
          expect(hasAllProps).toBe(true);
        });
    });
    it("returned object includes comment count property", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(
            expect.objectContaining({ comment_count: expect.any(String) })
          );
        });
    });
    it("returns obj with correct article id and correct structure", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then((res) => {
          expect(res.body.article_id).toBe(2);
          expect(res.body).toMatchObject({
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
          });
        });
    });
    it("status:400, returns bad request message when id is passed but incorrect type", () => {
      return request(app)
        .get("/api/articles/banana")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Bad request");
        });
    });
    it("status:404, returns not found message when request is correct but no resources exist currently", () => {
      return request(app)
        .get("/api/articles/700")
        .expect(404)
        .then((res) => {
          console.log(Object.keys(res));
          expect(res.body.msg).toBe("Not found");
        });
    });
  });
  describe("PATCH", () => {
    it("returns an object", () => {
      return request(app)
        .patch("/api/articles/5")
        .send({ inc_votes: 1 })
        .expect(201)
        .then((res) => {
          expect(typeof res).toEqual("object");
        });
    });
    it("status:200, returns article with updated number of votes", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 5 })
        .expect(201)
        .then((res) => {
          expect(res.body).toEqual({
            article_id: 1,
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: 105,
          });
        });
    });
    it("status:400, returns bad request message when id is passed but of the incorrect type", () => {
      return request(app)
        .patch("/api/articles/apple")
        .send({ inc_votes: 5 })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Bad request");
        });
    });
    it("status:404, returns not found message if id passed is valid but does not currently exist in db", () => {
      return request(app)
        .patch("/api/articles/1000")
        .send({ inc_votes: 5 })
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Not found");
        });
    });
  });
});
