import React from "react";
import PropTypes from "prop-types";
import { getUserPosts } from "../utils/api";
import queryString from "query-string";
import { buildDateTimeString } from "../utils/utils";
import Story from "./Story";

export default class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userPosts: null,
      isLoaded: false
    };
  }

  async componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);
    const userInfo = await getUserPosts(id);
    this.setState({
      userInfo: userInfo,
      isLoaded: true
    });
  }

  render() {
    const { userInfo, isLoaded } = this.state;
    let dateTime;
    if (isLoaded && userInfo !== null) {
      const date = new Date(userInfo.created * 1000);
      dateTime = buildDateTimeString(date);
    }
    return (
      <React.Fragment>
        {!isLoaded && <h1>Loading</h1>}

        {isLoaded && userInfo && (
          <div>
            <h1>{userInfo.username}</h1>
            <div className="user-meta-light">
              <span>joined </span>
              <span className="bold">{dateTime} </span>
              <span>has </span>
              <span className="bold">{userInfo.karma} </span>
              <span>karma</span>
            </div>
            <div>
              <h2>Posts</h2>
              <ul>
                {userInfo.posts.map(post => (
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
                ))}
              </ul>
            </div>
          </div>
        )}

        {isLoaded && !userInfo && <h1>User not found</h1>}
      </React.Fragment>
    );
  }
}
