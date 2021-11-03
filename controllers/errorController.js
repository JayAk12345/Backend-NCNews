exports.handleBadUrls = (req, res) => {
  console.log("HITTING BAD URL");
  res.status(404).send({ msg: "Not found" });
};

exports.handle500Errors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send("error");
};
