import React from "react";
import PropTypes from "prop-types";
import { buildDateTimeString } from "../utils/utils";
import { Link } from "react-router-dom";
import UserMeta from "./UserMeta";

export default function Story({
  postId,
  username,
  comments,
  link,
  score,
  timestamp,
  title,
  descendants,
  titleLink
}) {
  descendants = descendants !== undefined ? descendants : 0;
  return (
    <div>
      {titleLink(title, link)}
      <UserMeta
        username={username}
        timestamp={timestamp}
        postId={postId}
        descendants={descendants}
      />
    </div>
  );
}

Story.propTypes = {
  postId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  comments: PropTypes.array,
  link: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  descendants: PropTypes.number,
  titleLink: PropTypes.func.isRequired
};
