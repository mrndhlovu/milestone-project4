import React, { Component } from "react";
import { connect } from "react-redux";

import PageHeader from "../components/sharedComponents/PageHeader";
import BlogList from "../components/blog/BlogList";

import { fetchArticlesList } from "../actions/BlogActions";

import {
  getUser,
  getArticleList,
  getUserProfile
} from "../selectors/appSelectors";
import { getPageId } from "../utils/urls";

export class BlogContainer extends Component {
  componentDidMount() {
    this.props.fetchArticlesList();
  }

  render() {
    const { articles } = this.props;

    return articles.dataReceived && <BlogList articles={articles.data} />;
  }
}

const mapStateToProps = state => {
  return {
    articles: getArticleList(state),
    user: getUserProfile(state),
    auth: getUser(state)
  };
};

export default connect(mapStateToProps, { fetchArticlesList })(BlogContainer);
