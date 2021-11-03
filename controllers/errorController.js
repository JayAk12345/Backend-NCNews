exports.handleBadUrls = (req, res) => {
  console.log("HITTING BAD URL");
  res.status(404).send({ msg: "Not found" });
};
