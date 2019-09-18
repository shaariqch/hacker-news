import React from "react";
import PropTypes from "prop-types";
import { getTopNews } from "../utils/api";
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
    const topNews = await getTopNews();
    console.log(topNews);
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
        {isLoaded &&
          topNews.map(news => (
            <Story
              key={news.id}
              author={news.by}
              score={news.score}
              timestamp={news.time}
              title={news.title}
              link={news.url}
              comments={news.kids}
            />
          ))}
      </React.Fragment>
    );
  }
}
