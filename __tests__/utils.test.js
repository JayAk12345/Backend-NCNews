const generateTopic = require("../utilFunctions/generateTopic.js");
const {
  topicData,
  userData,
  articleData,
  commentData,
} = require("../db/data/test-data");

let articleTest = {
  title: "Running a Node App",
  topic: "coding",
  author: "jessjelly",
  body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
  created_at: new Date(1604728980000),
  votes: 0,
};

let topicDataTest = [
  {
    description: "Code is love, code is life",
    slug: "coding",
  },
];

describe("generateTopic", () => {
  it("returns the slug property when array contaning one obj is passed", () => {
    expect(generateTopic(articleTest, topicDataTest)).toBe("coding");
  });
  it("returns the matching slug when an array with multiple topic objects is passed", () => {
    let articleTestAltered = {
      title: "Running a Node App",
      topic: "cats",
      author: "jessjelly",
      body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
      created_at: new Date(1604728980000),
      votes: 0,
    };

    expect(generateTopic(articleTestAltered, topicData)).toBe("cats");
  });
  it("does not mutate unput arrays", () => {
    generateTopic(articleTest, topicData);

    expect(articleTest).toEqual({
      title: "Running a Node App",
      topic: "coding",
      author: "jessjelly",
      body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
      created_at: new Date(1604728980000),
      votes: 0,
    });
    expect(topicData).toEqual([
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
      },
      {
        description: "Not dogs",
        slug: "cats",
      },
      {
        description: "what books are made of",
        slug: "paper",
      },
    ]);
  });
});
