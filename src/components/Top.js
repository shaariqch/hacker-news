import React from "react";
import PropTypes from "prop-types";
import { getPosts, getTopPostsIds } from "../utils/api";
import Story from "./Story";

export default class Top extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      topPosts: null
    };
    this.getTitleLink = this.getTitleLink.bind(this);
  }

  async componentDidMount() {
    const topPostIds = await getTopPostsIds();
    const topPosts = await getPosts(topPostIds);
    this.setState({
      isLoaded: true,
      topPosts: topPosts
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
