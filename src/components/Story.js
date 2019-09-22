import React from "react";
import PropTypes from "prop-types";
import UserMeta from "./UserMeta";
import { ThemeConsumer } from "../contexts/theme";

export default function Story({
  postId,
  username,
  timestamp,
  descendants,
  titleLink
}) {
  descendants = descendants !== undefined ? descendants : 0;
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <>
          {titleLink}
          <UserMeta
            username={username}
            timestamp={timestamp}
            postId={postId}
            descendants={descendants}
            theme={theme}
          />
        </>
      )}
    </ThemeConsumer>
  );
}

Story.propTypes = {
  postId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  comments: PropTypes.array,
  score: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
  descendants: PropTypes.number,
  titleLink: PropTypes.element.isRequired
};
