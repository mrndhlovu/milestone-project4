import React from "react";

import Article from "./Article";
import { Segment } from "semantic-ui-react";
import CommentsBody from "../tickets/CommentsBody";

const ArticleDetail = ({ article, user }) => {
  const {
    title,
    short_disc,
    views,
    likes,
    created_at,
    id,
    description,
    owner_id
  } = article.data;

  return (
    <div>
      <Article
        id={id}
        title={title}
        created_at={created_at}
        short_disc={short_disc}
        likes={likes}
        views={views}
        username={article.owner}
        isArticleDetail={true}
        description={description}
        userId={user.id}
        ownerId={owner_id}
      />
      <Segment>
        <CommentsBody />
      </Segment>
    </div>
  );
};

export default ArticleDetail;
