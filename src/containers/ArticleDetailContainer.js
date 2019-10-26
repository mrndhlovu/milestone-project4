import React, { Component } from "react";
import { connect } from "react-redux";

import { Container } from "semantic-ui-react";

import {
  getUser,
  getUserProfile,
  getArticleDetail
} from "../selectors/appSelectors";
import { requestArticleDetail, deleteArticle } from "../actions/BlogActions";
import ArticleDetail from "../components/blog/ArticleDetail";
import CommentsContainer from "./CommentsContainer";

class ArticleDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleArticleDelete = this.handleArticleDelete.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.requestArticleDetail(id);
  }

  handleArticleDelete() {
    const { id } = this.props.match.params;
    this.props.deleteArticle(id);
    setTimeout(this.props.history.push(`/blog`), 1000);
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
            handleArticleDelete={this.handleArticleDelete}
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
  { requestArticleDetail, deleteArticle }
)(ArticleDetailContainer);
