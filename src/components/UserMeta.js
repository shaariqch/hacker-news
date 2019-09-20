import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { buildDateTimeString } from "../utils/utils";

export default function UserMeta({ username, timestamp, postId, descendants }) {
  const date = new Date(timestamp * 1000);
  const dateTime = buildDateTimeString(date);
  return (
    <React.Fragment>
      <div className="meta-info-light">
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
        {postId && (
          <span>
            with{" "}
            <Link
              to={{
                pathname: "/post",
                search: `?id=${postId}`
              }}
            >
              {descendants}
            </Link>{" "}
            comments
          </span>
        )}
      </div>
    </React.Fragment>
  );
}

UserMeta.propTypes = {
  username: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  postId: PropTypes.number,
  descendants: PropTypes.number
};
