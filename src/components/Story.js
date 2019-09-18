import React from "react";
import PropTypes from "prop-types";
import { buildDateTimeString } from "../utils/utils";
import { Link } from "react-router-dom";

export default function Story({
  author,
  comments,
  link,
  score,
  timestamp,
  title,
  descendants
}) {
  const date = new Date(timestamp * 1000);
  const dateTime = buildDateTimeString(date);
  descendants = descendants !== undefined ? descendants : 0;
  return (
    <li className="story">
      <a className="titleLink" href={link}>
        {title}
      </a>
      <div>
        <span>
          {`by`} <Link to="/user">{author}</Link>
        </span>
        <span>{` on ${dateTime} `}</span>
        <span>{`with ${descendants} comments`}</span>
      </div>
    </li>
  );
}

Story.propTypes = {
  author: PropTypes.string.isRequired,
  comments: PropTypes.array,
  link: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  descendants: PropTypes.number
};
