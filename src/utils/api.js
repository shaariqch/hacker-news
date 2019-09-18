async function getTopNewsIds() {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const ids = await response.json();
  return ids;
}

async function getNews(id) {
  const endpoint = "https://hacker-news.firebaseio.com/v0/item/" + id + ".json";
  const response = await fetch(endpoint);
  const result = await response.json();
  return result;
}

export async function getTopNews() {
  let ids = await getTopNewsIds();
  ids = ids.slice(0, 50);
  let topNewsPromises = [];

  ids.map(id => {
    const news = getNews(id);
    topNewsPromises.push(news);
  });
  const topNews = await Promise.all(topNewsPromises);
  return topNews;
}
