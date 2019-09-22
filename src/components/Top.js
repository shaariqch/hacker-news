import React from "react";
import { getPosts, getTopPostsIds } from "../utils/api";
import Story from "./Story";
import Title from "./Title";

export default class Top extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      topPosts: null
    };
  }

  async componentDidMount() {
    const topPostIds = await getTopPostsIds();
    const topPosts = await getPosts(topPostIds);
    this.setState({
      isLoaded: true,
      topPosts: topPosts
    });
  }

  render() {
    const { topPosts, isLoaded } = this.state;
    return (
      <React.Fragment>
        {!isLoaded && <h1>Loading</h1>}
        {isLoaded && (
          <ul>
            {topPosts.map(post => (
              <li className="story" key={post.id}>
                <Story
                  postId={post.id}
                  username={post.by}
                  score={post.score}
                  timestamp={post.time}
                  comments={post.kids}
                  descendants={post.descendants}
                  titleLink={<Title title={post.title} link={post.url} />}
                />
              </li>
            ))}
          </ul>
        )}
      </React.Fragment>
    );
  }
}
