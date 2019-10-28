import React from "react";

import Article from "./Article";
import EditButtons from "../sharedComponents/EditButtons";

const ArticleDetail = ({ article, user, handleDelete, handleLikeClick }) => {
  const {
    title,
    short_disc,
    views,
    created_at,
    id,
    content,
    owner_id,
    image
  } = article.data;

  const { isOwner, likes } = article;

  return (
    <div>
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
    </div>
  );
};

export default ArticleDetail;
