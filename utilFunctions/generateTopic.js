function generateTopic(article, topicData) {
  let returnedSlug;
  for (let i = 0; i < topicData.length; i++) {
    if (article.topic === topicData[i].slug) {
      returnedSlug = topicData[i].slug;
    }
  }
  return returnedSlug;
}

module.exports = generateTopic;
