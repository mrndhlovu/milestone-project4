import React from "react";

import Article from "./Article";
import { Segment } from "semantic-ui-react";
import CommentsBody from "../tickets/CommentsBody";

const ArticleDetail = ({ article }) => {
  const {
    title,
    username,
    short_disc,
    views,
    likes,
    created_at,
    id,
    description
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
        username={username}
        isArticleDetail={true}
        description={description}
      />
      <Segment>
        <CommentsBody />
      </Segment>
    </div>
  );
};

export default ArticleDetail;
