exports.sanitiseSortBy = (sort_by) => {
  const checkValue = sort_by.toLowerCase();
  const columns = ["created_at", "votes", "title", "comment_count", "author"];
  if (columns.includes(checkValue) === true) {
    return checkValue;
  } else {
    return Promise.reject({ status: 400, msg: "invalid query" });
  }
};
