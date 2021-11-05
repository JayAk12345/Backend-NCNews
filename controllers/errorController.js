exports.handleBadUrls = (req, res) => {
  console.log("HITTING BAD URL");
  res.status(404).send({ msg: "Not found" });
};

exports.handle400Errors = (err, req, res, next) => {
  if (err.status !== 400) {
    next(err);
  }
  console.log("HITTING 400 ERROR");
  res.status(400).send({ msg: "Bad request" });
};
exports.handle404Errors = (err, req, res, next) => {
  console.log("HITTING 404 ERROR");
  res.status(404).send({ msg: "Not found" });
};

exports.handle500Errors = (err, req, res) => {
  console.log(err.code);
  res.status(500).send("500 error");
};
