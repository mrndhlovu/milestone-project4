import React from "react";

import Article from "./Article";
import { Segment } from "semantic-ui-react";
import CommentsBody from "../tickets/CommentsBody";
import EditButtons from "../sharedComponents/EditButtons";

const ArticleDetail = ({ article, user, handleArticleDelete }) => {
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

  const isOwner = user.id === owner_id;

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
        buttons={
          <EditButtons
            isOwner={isOwner}
            handleTicketDelete={() => handleArticleDelete()}
            id={id}
            isTicket={false}
          />
        }
      />
      <Segment>
        <CommentsBody />
      </Segment>
    </div>
  );
};

export default ArticleDetail;
