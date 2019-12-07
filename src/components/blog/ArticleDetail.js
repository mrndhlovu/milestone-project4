import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import EditButtons from "../sharedComponents/EditButtons";
import { getFormatedDate, emptyFunction } from "../../utils/appUtils";

import {
  Icon,
  Card,
  Image,
  Container,
  Confirm,
  Segment
} from "semantic-ui-react";
import DynamicHeader from "../sharedComponents/DynamicHeader";
import { CommentsContainer } from "../../containers/CommentsContainer";
import Notification from "../sharedComponents/Notification";
import NotificationModal from "../sharedComponents/NotificationModal";
import ImageUploader from "../sharedComponents/ImageUploader";

const StyledSpan = styled.span`
  padding-left: 10px;
  padding-right: 10px;
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
  handleDeleteImage
}) => {
  const { title, views, created_at, id, content } = article.data;
  const { isOwner, likes, comments } = article;

  return (
    <Fragment>
      <Container
        style={{ paddingTop: 20 }}
        data-test-id="article-detail-container"
      >
        <Card fluid>
          {showImageUploader && (
            <Segment data-test-id="article-detail-image-uploader">
              <ImageUploader
                handleUploadImage={handleUpdateImage}
                handleDeleteImage={handleDeleteImage}
                image={image}
              />
            </Segment>
          )}
          <Image
            as={isOwner && "a"}
            src={image}
            wrapped
            ui={false}
            label={
              isOwner && {
                as: "a",
                color: "red",
                corner: "right",
                icon: "save"
              }
            }
            onClick={isOwner ? () => handleImageClick() : emptyFunction}
          />
          <Card.Content>
            <Card.Header as={Link} to={`/article/${id}`}>
              <StyledSpan>{title.toUpperCase()}</StyledSpan>
            </Card.Header>
            <Card.Meta>
              <StyledSpan>{article.owner}</StyledSpan> |
              <StyledSpan>{getFormatedDate(created_at)}</StyledSpan>
            </Card.Meta>
            <Card.Description data-test-id="article-content">
              {content}
            </Card.Description>
          </Card.Content>
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
          confirmButton="Yes delete"
          onCancel={() => handleCancel()}
          onConfirm={() => handleConfirm()}
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
      </Container>
    </Fragment>
  );
};

export default ArticleDetail;
