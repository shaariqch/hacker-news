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
    this.setState({
      isLoaded: true,
      topNews: topNews
    });
  }

  render() {
    const { isLoaded } = this.state;
    return (
      <React.Fragment>
        {!isLoaded && <h1>Loading</h1>}
        {isLoaded && <Story />}
      </React.Fragment>
    );
  }
}
