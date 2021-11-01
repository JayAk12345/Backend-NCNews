function generateAuthor(article, userData) {
  let returnedAuthor;
  for (let i = 0; i < userData.length; i++) {
    if (article.author === userData[i].username) {
      returnedAuthor = userData[i].username;
    }
  }
  return returnedAuthor;
}

module.exports = generateAuthor;
