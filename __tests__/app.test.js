const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");

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
    it("returns an object", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          expect(typeof res.body.topics).toBe("object");
          expect(res.body.topics.length).toBe(undefined);
        });
    });
  });
});
