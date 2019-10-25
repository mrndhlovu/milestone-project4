import React, { Component } from "react";
import { connect } from "react-redux";

import { createArticle } from "../actions/BlogActions";
import CreateArticle from "../components/blog/CreateArticle";

class CreateArticleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <CreateArticle />;
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { createArticle }
)(CreateArticleContainer);
