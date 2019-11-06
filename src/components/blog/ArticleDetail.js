import React, { Fragment } from "react";

import Article from "./Article";
import EditButtons from "../sharedComponents/EditButtons";
import { Icon, Label, Input } from "semantic-ui-react";

const ArticleDetail = ({
  article,
  user,
  handleDelete,
  handleLikeClick,
  isLoading,
  handleUpdateImage,
  image
}) => {
  const {
    title,
    short_disc,
    views,
    created_at,
    id,
    content,
    owner_id
  } = article.data;

  const { isOwner, likes } = article;

  return (
    <Fragment>
      {isOwner && (
        <Input
          size="mini"
          icon="image"
          label="Update Image"
          loading={isLoading}
          type="file"
          onChange={event => handleUpdateImage(event)}
        />
      )}
      <Article
        id={id}
        image={image}
        title={title}
        created_at={created_at}
        short_disc={short_disc}
        likes={likes}
        views={views}
        username={article.owner}
        handleLikeClick={handleLikeClick}
        isArticleDetail={true}
        description={content}
        userId={user.id}
        ownerId={owner_id}
        buttons={
          <EditButtons
            isOwner={isOwner}
            handleDelete={handleDelete}
            id={id}
            isTicket={false}
          />
        }
      />
    </Fragment>
  );
};

export default ArticleDetail;
