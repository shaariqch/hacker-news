import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { getPost } from "../utils/api";
import Story from "./Story";
export default class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null,
      isLoaded: false
    };
  }

  async componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);
    const post = await getPost(id);
    this.setState({
      post: post,
      isLoaded: true
    });
  }

  render() {
    const { post, isLoaded } = this.state;
    return (
      <React.Fragment>
        {!isLoaded && <h1>Loading</h1>}
        {isLoaded && (
          <Story
            key={post.id}
            post={post.id}
            username={post.by}
            score={post.score}
            timestamp={post.time}
            title={post.title}
            link={post.url}
            comments={post.kids}
            descendants={post.descendants}
          />
        )}
      </React.Fragment>
    );
  }
}
