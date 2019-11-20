import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getUser,
  getUserProfile,
  getArticleDetail,
  getArticleUpdate
} from "../selectors/appSelectors";
import {
  requestArticleDetail,
  deleteArticle,
  updateArticleLikes,
  uploadArticleImage
} from "../actions/BlogActions";
import ArticleDetail from "../components/blog/ArticleDetail";
import { APP_TYPE } from "../constants/constants";
import { refresh } from "../utils/appUtils";

class ArticleDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { showConfirmModal: false, title: "" };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleUpdateImage = this.handleUpdateImage.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.requestArticleDetail(id);
  }

  componentDidUpdate(prevProps) {
    const { article, updateArticle } = this.props;

    if (prevProps.article !== article) {
      if (article.dataReceived) {
        const { title } = article.data.data;
        this.setState({ title: title });
      }
    }

    if (prevProps.updateArticle !== updateArticle) {
      if (updateArticle.dataReceived) {
        refresh();
      }
    }
  }

  handleDelete() {
    this.setState({ showConfirmModal: true });
  }

  handleUpdateImage(event) {
    const file = event.target.files[0];
    const { id } = this.props.match.params;
    this.props.uploadArticleImage(file, APP_TYPE.post, id);
  }

  handleConfirm() {
    const { id } = this.props.match.params;
    this.props.deleteArticle(id);
    setTimeout(this.props.history.push(`/blog`), 1000);
  }

  handleLikeClick(id) {
    this.props.updateArticleLikes(id);
  }

  handleCancel() {
    this.setState({ showConfirmModal: false });
  }

  render() {
    const { article, user, history } = this.props;
    const { showConfirmModal } = this.state;
    const image = article.dataReceived && article.data.data.image;
    const allAccess =
      user.dataReceived &&
      user.data.current_membership.membership.is_pro_member;

    return (
      article.dataReceived && (
        <ArticleDetail
          image={image}
          article={article.data}
          owner={article.owner}
          user={user.data}
          handleDelete={this.handleDelete}
          handleLikeClick={this.handleLikeClick}
          handleUpdateImage={this.handleUpdateImage}
          history={history}
          allAccess={allAccess}
          showConfirmModal={showConfirmModal}
          handleCancel={this.handleCancel}
          handleConfirm={this.handleConfirm}
        />
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    article: getArticleDetail(state),
    user: getUserProfile(state),
    auth: getUser(state),
    updateArticle: getArticleUpdate(state)
  };
};

export default connect(mapStateToProps, {
  requestArticleDetail,
  deleteArticle,
  updateArticleLikes,
  uploadArticleImage
})(withRouter(ArticleDetailContainer));
