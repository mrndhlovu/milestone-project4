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
import { Container } from "semantic-ui-react";

export class BlogContainer extends Component {
  componentDidMount() {
    this.props.fetchArticlesList();
  }

  render() {
    const { articles } = this.props;

    return (
      <div>
        <PageHeader />
        <Container style={{ paddingTop: 20 }}>
          {articles.dataReceived && <BlogList articles={articles.data} />}
        </Container>
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
