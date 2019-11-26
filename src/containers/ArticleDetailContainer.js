import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getUser,
  getUserProfile,
  getArticleDetail,
  getArticleUpdate,
  getComments
} from "../selectors/appSelectors";
import {
  requestArticleDetail,
  deleteArticle,
  updateArticleLikes,
  uploadArticleImage
} from "../actions/BlogActions";
import ArticleDetail from "../components/blog/ArticleDetail";
import { APP_TYPE } from "../constants/constants";
import { refresh, getNewFileName } from "../utils/appUtils";
import { createComment, createReply } from "../actions/TicketActions";
import { deleteImage } from "../actions/AuthActions";

class ArticleDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmModal: false,
      title: "",
      showImageUploader: false
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleUpdateImage = this.handleUpdateImage.bind(this);
    this.handleDeleteImage = this.handleDeleteImage.bind(this);
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

  handleUpdateImage(file) {
    const fileName = getNewFileName(file.name);
    const { id } = this.props.match.params;
    this.props.uploadArticleImage(file, fileName, APP_TYPE.post, id);
  }

  handleDeleteImage() {
    const { id } = this.props.match.params;
    this.props.deleteImage(APP_TYPE.post, id);
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
    const { showConfirmModal, showImageUploader } = this.state;
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
          createComment={this.props.createComment}
          createReply={this.props.createReply}
          handleDeleteImage={this.handleDeleteImage}
          showImageUploader={showImageUploader}
          handleImageClick={() =>
            this.setState({ showImageUploader: !showImageUploader })
          }
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
    updateArticle: getArticleUpdate(state),
    articleComments: getComments(state)
  };
};

ArticleDetailContainer.propTypes = {
  history: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateArticle: PropTypes.object.isRequired,
  articleComments: PropTypes.object.isRequired,
  allAccess: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  requestArticleDetail: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  updateArticleLikes: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  createReply: PropTypes.func.isRequired,
  uploadArticleImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  requestArticleDetail,
  deleteArticle,
  updateArticleLikes,
  createComment,
  createReply,
  uploadArticleImage,
  deleteImage
})(withRouter(ArticleDetailContainer));
