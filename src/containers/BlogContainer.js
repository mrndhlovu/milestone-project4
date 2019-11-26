import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import BlogList from "../components/blog/BlogList";
import { fetchArticlesList } from "../actions/BlogActions";
import {
  getUser,
  getArticleList,
  getUserProfile
} from "../selectors/appSelectors";

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

BlogContainer.propTypes = {
  user: PropTypes.object.isRequired,
  articles: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  fetchArticlesList: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { fetchArticlesList })(BlogContainer);
