import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { getItem, getComments } from "../utils/api";
import Story from "./Story";
import UserMeta from "../components/UserMeta";
export default class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null,
      postLoaded: false,
      comments: null,
      commentsLoaded: false
    };
    this.getTitleLink = this.getTitleLink.bind(this);
  }

  async componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);
    const post = await getItem(id);
    this.setState({
      post: post,
      postLoaded: true
    });
    const comments = await getComments(post.kids);
    console.log(comments);
    this.setState({
      comments: comments,
      commentsLoaded: true
    });
  }

  getTitleLink(title, link) {
    return (
      <h1 className=" mb-0">
        <a className="title-light" href={link}>
          {title}
        </a>
      </h1>
    );
  }

  render() {
    const { post, postLoaded, comments, commentsLoaded } = this.state;
    return (
      <React.Fragment>
        {!postLoaded && <h1>Loading</h1>}
        {postLoaded && (
          <React.Fragment>
            <Story
              key={post.id}
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
            {!commentsLoaded && <h1>Loading comments</h1>}
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
    <div className="mlr-2">
      <div className="mb-2">
        <UserMeta username={username} timestamp={timestamp} />
      </div>
      <div dangerouslySetInnerHTML={createCommentMarkup()} />
    </div>
  );
}
