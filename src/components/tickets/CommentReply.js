import React, { Fragment } from "react";

import { getFormatedDate } from "../../constants/constants";

import { Comment, Header } from "semantic-ui-react";

export const CommentReply = ({ comments, parentId }) => {
  return Object.keys(comments).map(index => {
    const { username, timestamp, comment, parent } = comments[index];

    return (
      parent &&
      parentId === parent && (
        <Fragment key={index}>
          <Comment.Author as="a">{username}</Comment.Author>
          <Comment.Metadata>
            <Header as="h6">{getFormatedDate(timestamp)}</Header>
          </Comment.Metadata>
          <Comment.Text>{comment}</Comment.Text>
        </Fragment>
      )
    );
  });
};

export default CommentReply;
