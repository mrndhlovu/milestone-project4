import React, { Component } from "react";
import { connect } from "react-redux";

import { Container } from "semantic-ui-react";

import { getUser, getUserProfile, getArticle } from "../selectors/appSelectors";
import { requestArticleDetail } from "../actions/BlogActions";
import ArticleDetail from "../components/blog/ArticleDetail";
import CommentsContainer from "./CommentsContainer";

class ArticleDetailContainer extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.requestArticleDetail(id);
  }

  render() {
    const { article } = this.props;

    return (
      <Container style={{ paddingTop: 20 }}>
        {article.dataReceived && <ArticleDetail article={article.data} />}
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
    article: getArticle(state),
    user: getUserProfile(state),
    auth: getUser(state)
  };
};

export default connect(
  mapStateToProps,
  { requestArticleDetail }
)(ArticleDetailContainer);
