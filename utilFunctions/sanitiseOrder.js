exports.sanitiseOrder = (order) => {
  const valid = ["asc", "desc"];
  const checkValue = order.toLowerCase();
  if (valid.includes(checkValue) === true) {
    return checkValue;
  } else {
    return Promise.reject({ status: 400, msg: "invalid query" });
  }
};
