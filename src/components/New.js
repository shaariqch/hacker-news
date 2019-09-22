import React from "react";
import { getPosts, getNewPostIds } from "../utils/api";
import Story from "./Story";
import Title from "./Title";
import Loading from './Loading'
export default class New extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      newPosts: null
    };
    this.getTitleLink = this.getTitleLink.bind(this);
  }

  async componentDidMount() {
    const newPostIds = await getNewPostIds();
    const newPosts = await getPosts(newPostIds);
    this.setState({
      isLoaded: true,
      newPosts: newPosts
    });
  }

  getTitleLink(title, link, theme) {
    return (
      <a className={`title-${theme}`} href={link}>
        {title}
      </a>
    );
  }

  render() {
    const { newPosts, isLoaded } = this.state;
    return (
      <React.Fragment>
        {!isLoaded && <Loading />}
        {isLoaded && (
          <ul>
            {newPosts.map(post => (
              <li className="story" key={post.id}>
                <Story
                  postId={post.id}
                  username={post.by}
                  score={post.score}
                  timestamp={post.time}
                  comments={post.kids}
                  descendants={post.descendants}
                  titleLink={<Title title={post.title} link={post.url} />}
                />
              </li>
            ))}
          </ul>
        )}
      </React.Fragment>
    );
  }
}
