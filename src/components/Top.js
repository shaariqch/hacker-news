import React from "react";
import PropTypes from "prop-types";
import { getTopPosts } from "../utils/api";
import Story from "./Story";

export default class Top extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      topNews: null
    };
  }

  async componentDidMount() {
    const topNews = await getTopPosts();
    this.setState({
      isLoaded: true,
      topNews: topNews
    });
  }

  render() {
    const { topNews, isLoaded } = this.state;
    return (
      <React.Fragment>
        {!isLoaded && <h1>Loading</h1>}
        {isLoaded && (
          <ul>
            {topNews.map(news => (
              <Story
                key={news.id}
                post={news.id}
                username={news.by}
                score={news.score}
                timestamp={news.time}
                title={news.title}
                link={news.url}
                comments={news.kids}
                descendants={news.descendants}
              />
            ))}
          </ul>
        )}
      </React.Fragment>
    );
  }
}
