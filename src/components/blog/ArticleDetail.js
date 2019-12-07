import React from "react";
import styled from "styled-components";

import EditButtons from "../sharedComponents/EditButtons";
import { getFormatedDate, emptyFunction } from "../../utils/appUtils";

import {
  Icon,
  Card,
  Image,
  Container,
  Confirm,
  Segment,
  Header
} from "semantic-ui-react";

import { CommentsContainer } from "../../containers/CommentsContainer";
import Notification from "../sharedComponents/Notification";
import NotificationModal from "../sharedComponents/NotificationModal";
import ImageUploader from "../sharedComponents/ImageUploader";

const StyledSpan = styled.span`
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledContainer = styled(Container)`
  padding-top: 20px !important;
`;

const StyledHeader = styled(Header)`
  font-size: 48px !important;
`;

const StyledContentContainer = styled(Container)`
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  white-space: pre-wrap !important;
`;

const ArticleDetail = ({
  allAccess,
  article,
  handleDelete,
  handleLikeClick,
  handleUpdateImage,
  handleImageClick,
  showImageUploader,
  history,
  image,
  showConfirmModal,
  handleCancel,
  handleConfirm,
  user,
  createComment,
  createReply,
  handleDeleteImage,
  deleteOption
}) => {
  const { title, views, created_at, id, content } = article.data;
  const { isOwner, likes, comments } = article;
  const deleteImage = deleteOption === "image";

  return (
    <StyledContainer data-test-id="article-detail-container">
      <Card fluid>
        {showImageUploader && (
          <Segment data-test-id="article-detail-image-uploader">
            <ImageUploader
              handleUploadImage={handleUpdateImage}
              handleDeleteImage={handleDelete}
              onClose={handleImageClick}
              image={image}
            />
          </Segment>
        )}
        <Image
          fluid
          as={isOwner && "a"}
          src={image}
          wrapped
          ui={false}
          label={
            isOwner && {
              color: "red",
              corner: "right",
              icon: "save"
            }
          }
          onClick={isOwner ? () => handleImageClick() : emptyFunction}
        />
        <StyledContainer text fluid>
          <StyledHeader content={title.toUpperCase()} />
          <small>
            {article.owner} |
            <StyledSpan>{getFormatedDate(created_at)}</StyledSpan>
          </small>
          <StyledContentContainer data-test-id="article-content">
            {content}
          </StyledContentContainer>
        </StyledContainer>
        <Card.Content extra>
          <StyledSpan>
            <Icon
              link
              name="thumbs up"
              color="grey"
              as="i"
              fitted
              onClick={() => handleLikeClick(id)}
              data-test-id="article-like-buttons"
            />
            <StyledSpan>{likes}</StyledSpan>
          </StyledSpan>
          <StyledSpan>
            <Icon name="eye" />
          </StyledSpan>
          {views}
          <EditButtons
            isOwner={isOwner}
            handleDelete={handleDelete}
            id={id}
            isTicket={false}
            dataTestId="article-detail-edit-buttons"
          />
        </Card.Content>
      </Card>

      {allAccess ? (
        <CommentsContainer
          createComment={createComment}
          createReply={createReply}
          comments={comments}
          articleId={id}
          isArticle={true}
          userId={user.id}
        />
      ) : (
        <Notification
          redirect="/pricing"
          message="Access to comments requires a "
          linkText="Unicorn PRO Account"
        />
      )}

      <Confirm
        open={showConfirmModal}
        cancelButton="Cancel"
        confirmButton={
          deleteImage ? "Yes delete current image" : "Yes delete article"
        }
        onCancel={() => handleCancel()}
        onConfirm={
          deleteImage ? () => handleDeleteImage() : () => handleConfirm()
        }
        data-test-id="article-confirm-modal"
      />
      {!allAccess && (
        <NotificationModal
          feature="read the article"
          history={history}
          redirect="blog"
          showMessageModal={true}
          header="UPGRADE MEMBERSHIP"
        />
      )}
    </StyledContainer>
  );
};

export default ArticleDetail;
