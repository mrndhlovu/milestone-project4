import React, { Component } from "react";
import { connect } from "react-redux";

import HomepageHeading from "../components/home/HeadingImage";
import BlogList from "../components/blog/BlogList";

import { fetchArticlesList } from "../actions/BlogActions";

import {
  getUser,
  getArticleList,
  getUserProfile
} from "../selectors/appSelectors";

export class BlogContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchArticlesList();
  }

  render() {
    const { articles } = this.props;

    return (
      <div>
        <HomepageHeading />
        <BlogList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: getArticleList(state),
    user: getUserProfile(state),
    auth: getUser(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchArticlesList }
)(BlogContainer);
