import React from "react";

import { getFormatedDate } from "../../utils/appUtils";

import { Comment, Header } from "semantic-ui-react";

export const CommentReply = ({ comments, parentId }) => {
  return Object.keys(comments).map(index => {
    const { username, timestamp, comment, parent, image } = comments[index];

    return (
      parent &&
      parentId === parent && (
        <Comment.Group key={index}>
          <Comment.Avatar src={image} />
          <Comment.Author as="a">{username.toLowerCase()}</Comment.Author>
          <Comment.Metadata>
            <Header as="h5" color="grey">
              {getFormatedDate(timestamp)}
            </Header>
          </Comment.Metadata>
          <Comment.Text>{comment}</Comment.Text>
        </Comment.Group>
      )
    );
  });
};

export default CommentReply;
