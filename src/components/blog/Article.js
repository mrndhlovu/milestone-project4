import React from "react";
import { NavLink } from "react-router-dom";

import { Card, Image, Icon } from "semantic-ui-react";

import { getFormatedDate } from "../../utils/appUtils";
import EditButtons from "../sharedComponents/EditButtons";

const Article = ({
  title,
  username,
  short_disc,
  views,
  likes,
  created_at,
  id,
  description,
  isArticleDetail,
  handleLikeClick,
  buttons
}) => {
  return (
    <div>
      <Card fluid>
        <Image src="/images/avatar/large/daniel.jpg" wrapped ui={false} />
        <Card.Content>
          <Card.Header as={NavLink} to={`/article/${id}`}>
            {title.toUpperCase()}
          </Card.Header>
          <Card.Meta>
            {username} | {getFormatedDate(created_at)}
          </Card.Meta>
          <Card.Description>
            {isArticleDetail ? description : short_disc}
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
              onClick={isArticleDetail ? () => handleLikeClick(id) : () => {}}
            />
            {likes}
          </span>
          <Icon name="eye" />
          {views}
          {buttons}
        </Card.Content>
      </Card>
    </div>
  );
};

export default Article;