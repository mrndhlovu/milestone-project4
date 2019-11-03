import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Container, Confirm } from "semantic-ui-react";

import {
  getUser,
  getUserProfile,
  getArticleDetail
} from "../selectors/appSelectors";
import {
  requestArticleDetail,
  deleteArticle,
  updateArticleLikes,
  uploadArticleImage
} from "../actions/BlogActions";
import ArticleDetail from "../components/blog/ArticleDetail";
import CommentsContainer from "./CommentsContainer";
import StyledMessage from "../components/sharedComponents/StyledMessage";
import DynamicHeader from "../components/sharedComponents/DynamicHeader";
import { APP_TYPE } from "../constants/constants";

class ArticleDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { showConfirmModal: false, image: "", articleTitle: "" };

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
    const { article } = this.props;

    if (prevProps.article !== article) {
      if (article.dataReceived) {
        const { image, title } = article.data.data;
        this.setState({ image: image, articleTitle: title });
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
    const { article, user } = this.props;
    const { showConfirmModal, image, articleTitle } = this.state;

    const allAccess =
      user.dataReceived &&
      user.data.current_membership.membership.is_pro_member;

    return (
      <Fragment>
        <DynamicHeader
          option="post"
          image={image}
          articleTitle={articleTitle}
        />
        <Container style={{ paddingTop: 20 }}>
          {article.dataReceived && (
            <ArticleDetail
              article={article.data}
              owner={article.owner}
              user={user.data}
              handleDelete={this.handleDelete}
              handleLikeClick={this.handleLikeClick}
              handleUpdateImage={this.handleUpdateImage}
            />
          )}
          {article.dataReceived && allAccess ? (
            <CommentsContainer
              comments={article.data.comments}
              articleId={article.data.data.id}
              isArticle={true}
            />
          ) : (
            <StyledMessage
              redirect="/pricing"
              message="Access to comments requires a "
              linkText="Unicorn PRO Account"
            />
          )}

          <Confirm
            open={showConfirmModal}
            cancelButton="Cancel"
            confirmButton="Yes delete"
            onCancel={() => this.handleCancel()}
            onConfirm={() => this.handleConfirm()}
          />
        </Container>
      </Fragment>
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
  {
    requestArticleDetail,
    deleteArticle,
    updateArticleLikes,
    uploadArticleImage
  }
)(ArticleDetailContainer);
