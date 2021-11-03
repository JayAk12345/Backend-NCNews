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

describe.only("/api/topics", () => {
  describe("GET", () => {
    // it("returns an object", () => {
    //   return request(app)
    //     .get("/api/topics")
    //     .expect(200)
    //     .then((res) => {
    //       console.log(res.body);
    //     });
    // });
    it("returns all topics in the correct structure of an object with a key of what is being returned and a value of an array of topic objects", () => {
      let correctStructure = { topics: topicDataTest };
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          expect(typeof res.body).toBe("object");
          expect(res.body.length).toBe(undefined);
          console.log(res, "test");
          expect(res.body).toEqual(correctStructure);
        });
    });
  });
});
