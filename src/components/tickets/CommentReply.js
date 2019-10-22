import React, { Fragment } from "react";

import { getFormatedDate } from "../../utils/appUtils";

import { Comment, Header } from "semantic-ui-react";

export const CommentReply = ({ comments, parentId }) => {
  return Object.keys(comments).map(index => {
    const { username, timestamp, comment, parent } = comments[index];

    return (
      parent &&
      parentId === parent && (
        <Fragment key={index}>
          <Comment.Group>
            <Comment.Author as="a">{username.toUpperCase()}</Comment.Author>
            <Comment.Metadata>
              <Header as="h5" color="grey">
                {getFormatedDate(timestamp)}
              </Header>
            </Comment.Metadata>
            <Comment.Text>{comment}</Comment.Text>
          </Comment.Group>
        </Fragment>
      )
    );
  });
};

export default CommentReply;
