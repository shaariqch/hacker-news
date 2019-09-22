import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { getItem, getComments } from "../utils/api";
import Story from "./Story";
import UserMeta from "../components/UserMeta";
import { ThemeConsumer } from "../contexts/theme";
import Title from "./Title";
import Loading from "./Loading";

export default class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null,
      postLoaded: false,
      comments: null,
      commentsLoaded: false
    };
  }

  async componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);
    const post = await getItem(id);
    this.setState({
      post: post,
      postLoaded: true
    });
    const comments = await getComments(post.kids);
    this.setState({
      comments: comments,
      commentsLoaded: true
    });
  }

  render() {
    const { post, postLoaded, comments, commentsLoaded } = this.state;
    return (
      <React.Fragment>
        {!postLoaded && <Loading />}
        {postLoaded && (
          <React.Fragment>
            <Story
              key={post.id}
              postId={post.id}
              username={post.by}
              score={post.score}
              timestamp={post.time}
              comments={post.kids}
              descendants={post.descendants}
              titleLink={
                <h1 className=" mb-0">
                  <Title title={post.title} link={post.url} />
                </h1>
              }
            />
            {!commentsLoaded && <Loading text="Loading Comments" />}
            {commentsLoaded && (
              <ul>
                {comments.map(comment => (
                  <li key={comment.id} className="comment-light">
                    <Comment
                      username={comment.by}
                      text={comment.text}
                      timestamp={comment.time}
                    />
                  </li>
                ))}
              </ul>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

function Comment({ username, text, timestamp }) {
  function createCommentMarkup() {
    return { __html: text };
  }
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className="mlr-2">
          <div className="mb-2">
            <UserMeta username={username} timestamp={timestamp} theme={theme} />
          </div>
          <div dangerouslySetInnerHTML={createCommentMarkup()} />
        </div>
      )}
    </ThemeConsumer>
  );
}

Comment.propTypes = {
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired
};
