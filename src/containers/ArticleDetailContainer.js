import React, { Component } from "react";
import { connect } from "react-redux";

import { Container } from "semantic-ui-react";

import {
  getUser,
  getUserProfile,
  getArticleDetail
} from "../selectors/appSelectors";
import { requestArticleDetail } from "../actions/BlogActions";
import ArticleDetail from "../components/blog/ArticleDetail";
import CommentsContainer from "./CommentsContainer";

class ArticleDetailContainer extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.requestArticleDetail(id);
  }

  render() {
    const { article, user } = this.props;

    return (
      <Container style={{ paddingTop: 20 }}>
        {article.dataReceived && (
          <ArticleDetail
            article={article.data}
            owner={article.owner}
            user={user.data}
          />
        )}
        {article.dataReceived && (
          <CommentsContainer
            comments={article.data.comments}
            articleId={article.data.data.id}
            isArticle={true}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    article: getArticleDetail(state),
    user: getUserProfile(state),
    auth: getUser(state)
  };
};

export default connect(
  mapStateToProps,
  { requestArticleDetail }
)(ArticleDetailContainer);
