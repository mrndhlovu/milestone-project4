import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import EditButtons from "../sharedComponents/EditButtons";
import { getFormatedDate } from "../../utils/appUtils";

import {
  Icon,
  Input,
  Card,
  Image,
  Container,
  Confirm
} from "semantic-ui-react";
import DynamicHeader from "../sharedComponents/DynamicHeader";
import { CommentsContainer } from "../../containers/CommentsContainer";
import StyledMessage from "../sharedComponents/StyledMessage";
import MessageModal from "../sharedComponents/MessageModal";

const ArticleDetail = ({
  allAccess,
  article,
  handleDelete,
  handleLikeClick,
  handleUpdateImage,
  history,
  image,
  isLoading,
  showConfirmModal,
  handleCancel,
  handleConfirm
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
        {isOwner && (
          <Input
            size="mini"
            icon="image"
            label="Update Image"
            loading={isLoading}
            type="file"
            onChange={event => handleUpdateImage(event)}
            data-test-id="article-image-input"
          />
        )}
        <Card fluid>
          <Image src={image} wrapped ui={false} />
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
            comments={comments}
            articleId={id}
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
