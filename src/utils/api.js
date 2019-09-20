export async function getTopPostsIds() {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const ids = await response.json();
  return ids;
}

export async function getNewPostIds() {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json"
  );
  const ids = await response.json();
  return ids;
}

export async function getItem(id) {
  const endpoint = "https://hacker-news.firebaseio.com/v0/item/" + id + ".json";
  const response = await fetch(endpoint);
  const result = await response.json();
  return result;
}

export async function getPosts(ids) {
  ids = ids.slice(0, 50);
  let postsPromises = [];

  ids.map(id => {
    const news = getItem(id);
    postsPromises.push(news);
  });
  const posts = await Promise.all(postsPromises);
  return posts.filter(posts => posts && posts.url !== undefined);
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
    const news = getItem(postId);
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

export async function getComments(commentIds) {
  let commentsPromises = [];
  commentIds.map(commentId => {
    const commentPromise = getItem(commentId);
    commentsPromises.push(commentPromise);
  });
  const comments = await Promise.all(commentsPromises);
  return comments;
}
