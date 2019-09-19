import React from "react";
import PropTypes from "prop-types";
import { buildDateTimeString } from "../utils/utils";
import { Link } from "react-router-dom";


export default function Story({
  post,
  username,
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
      <a className="title-light" href={link}>
        {title}
      </a>
      <div className="story-meta-light">
        <span>
          by{" "}
          <Link
            to={{
              pathname: "/user",
              search: `?id=${username}`
            }}
          >
            {username}
          </Link>
        </span>
        <span>{` on ${dateTime} `}</span>
        <span>
          with{" "}
          <Link
            to={{
              pathname: "/post",
              search: `?id=${post}`
            }}
          >
            {descendants}
          </Link>{" "}
          comments
        </span>
      </div>
    </li>
  );
}

Story.propTypes = {
  username: PropTypes.string.isRequired,
  comments: PropTypes.array,
  link: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  descendants: PropTypes.number
};
