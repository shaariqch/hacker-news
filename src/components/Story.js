import React from "react";
import PropTypes from "prop-types";

export default function Story({
  author,
  comments,
  link,
  score,
  timestamp,
  title
}) {
  const date = new Date(timestamp * 1000).toDateString();
  const numberOfComments = comments !== undefined ? comments.length : 0;
  return (
    <div>
      <h3>{title}</h3>
      <span>{`by ${author} `}</span>
      <span>{` on ${date} `}</span>
      <span>{`with ${numberOfComments} comments`}</span>
    </div>
  );
}
