const generateTopic = require("../utilFunctions/generateTopic.js");
const generateAuthor = require("../utilFunctions/generateAuthor");
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

let articleTestGenerateAuthor = {
  title: "Living in the shadow of a great man",
  topic: "mitch",
  author: "butter_bridge",
  body: "I find this existence challenging",
  created_at: new Date(1594329060000),
  votes: 100,
};

let userDataTest = [
  {
    username: "butter_bridge",
    name: "jonny",
    avatar_url:
      "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
  },
];

describe("generateAuthor", () => {
  it("returns the author property when a users array with one object is passed", () => {
    expect(generateAuthor(articleTestGenerateAuthor, userDataTest)).toBe(
      "butter_bridge"
    );
  });
  it("returns the appropriate author property when a user array is passed that has multiple user objects", () => {
    let articleTestAltered = {
      title: "Running a Node App",
      topic: "coding",
      author: "rogersop",
      body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
      created_at: new Date(1604728980000),
      votes: 0,
    };

    expect(generateAuthor(articleTestAltered, userData)).toBe("rogersop");
  });
  it("does not mutate input arrays", () => {
    generateAuthor(articleTest, userData);
    expect(articleTestGenerateAuthor).toEqual({
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: new Date(1594329060000),
      votes: 100,
    });
    let userDataNonMutation = [
      {
        username: "butter_bridge",
        name: "jonny",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
      {
        username: "icellusedkars",
        name: "sam",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      },
      {
        username: "rogersop",
        name: "paul",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
      },
      {
        username: "lurker",
        name: "do_nothing",
        avatar_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      },
    ];

    expect(userData).toEqual(userDataNonMutation);
  });
});
