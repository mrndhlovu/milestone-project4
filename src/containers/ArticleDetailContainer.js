import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Confirm } from "semantic-ui-react";

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
    this.state = { showConfirmModal: false };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.requestArticleDetail(id);
  }

  handleDelete() {
    this.setState({ showConfirmModal: true });
  }

  handleConfirm() {
    const { id } = this.props.match.params;
    this.props.deleteArticle(id);
    setTimeout(this.props.history.push(`/blog`), 1000);
  }

  handleCancel() {
    this.setState({ showConfirmModal: false });
  }

  render() {
    const { article, user } = this.props;
    const { showConfirmModal } = this.state;

    return (
      <Container style={{ paddingTop: 20 }}>
        <Confirm
          open={showConfirmModal}
          cancelButton="Cancel"
          confirmButton="Yes delete"
          onCancel={() => this.handleCancel()}
          onConfirm={() => this.handleConfirm()}
        />
        {article.dataReceived && (
          <ArticleDetail
            article={article.data}
            owner={article.owner}
            user={user.data}
            handleDelete={this.handleDelete}
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
