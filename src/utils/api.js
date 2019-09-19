async function getTopPostsIds() {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const ids = await response.json();
  return ids;
}

export async function getPost(id) {
  const endpoint = "https://hacker-news.firebaseio.com/v0/item/" + id + ".json";
  const response = await fetch(endpoint);
  const result = await response.json();
  return result;
}

export async function getTopPosts() {
  let ids = await getTopPostsIds();
  ids = ids.slice(0, 50);
  let topPostsPromises = [];

  ids.map(id => {
    const news = getPost(id);
    topPostsPromises.push(news);
  });
  const topPosts = await Promise.all(topPostsPromises);
  return topPosts.filter(news => news.url !== undefined);
}

export async function getUserPosts(id) {
  const endpoint = `https://hacker-news.firebaseio.com/v0/user/${id}.json`;
  const response = await fetch(endpoint);
  const userInfo = await response.json();
  if (userInfo === null) {
    return null;
  }
  let posts = userInfo.submitted;
  posts = posts !== undefined ? posts : [];
  posts = posts.slice(0, 50);

  let userPostsPromises = [];
  posts.map(postId => {
    const news = getPost(postId);
    userPostsPromises.push(news);
  });
  const userPosts = await Promise.all(userPostsPromises);

  return {
    username: userInfo.id,
    created: userInfo.created,
    karma: userInfo.karma,
    posts: userPosts.filter(
      post => post.title !== undefined && post.url !== undefined
    )
  };
}
