import React from "react";
import { getPosts, getNewPostIds } from "../utils/api";
import Story from "./Story";

export default class New extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      newPosts: null
    };
    this.getTitleLink = this.getTitleLink.bind(this);
  }

  async componentDidMount() {
    const newPostIds = await getNewPostIds();
    const newPosts = await getPosts(newPostIds);
    this.setState({
      isLoaded: true,
      newPosts: newPosts
    });
  }

  getTitleLink(title, link) {
    return (
      <a className="title-light" href={link}>
        {title}
      </a>
    );
  }

  render() {
    const { newPosts, isLoaded } = this.state;
    return (
      <React.Fragment>
        {!isLoaded && <h1>Loading</h1>}
        {isLoaded && (
          <ul>
            {newPosts.map(post => (
              <li className="story" key={post.id}>
                <Story
                  postId={post.id}
                  username={post.by}
                  score={post.score}
                  timestamp={post.time}
                  title={post.title}
                  link={post.url}
                  comments={post.kids}
                  descendants={post.descendants}
                  titleLink={this.getTitleLink}
                />
              </li>
            ))}
          </ul>
        )}
      </React.Fragment>
    );
  }
}
