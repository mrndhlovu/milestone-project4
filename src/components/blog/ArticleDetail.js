import React, { Fragment } from "react";
import { Link } from "react-router-dom";

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
import StyledMessage from "../sharedComponents/StyledMessage";
import MessageModal from "../sharedComponents/MessageModal";
import ImageUploader from "../sharedComponents/ImageUploader";

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
      <DynamicHeader
        option="post"
        title={title}
        dataTestId="article-detail-header"
      />

      <Container
        style={{ paddingTop: 20 }}
        data-test-id="article-detail-container"
      >
        <Card fluid>
          {showImageUploader && (
            <Segment>
              <ImageUploader
                handleUploadImage={handleUpdateImage}
                handleDeleteImage={handleDeleteImage}
                image={image}
              />
            </Segment>
          )}
          <Image
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
              {title.toUpperCase()}
            </Card.Header>
            <Card.Meta>
              {article.owner} | {getFormatedDate(created_at)}
            </Card.Meta>
            <Card.Description data-test-id="article-content">
              {content}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <span style={{ paddingRight: 20 }}>
              <Icon
                link
                name="thumbs up"
                color="grey"
                as="i"
                fitted
                onClick={() => handleLikeClick(id)}
                data-test-id="article-like-buttons"
              />
              {likes}
            </span>
            <Icon name="eye" />
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
          onCancel={() => handleCancel()}
          onConfirm={() => handleConfirm()}
          data-test-id="article-confirm-modal"
        />
        {!allAccess && (
          <MessageModal
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
