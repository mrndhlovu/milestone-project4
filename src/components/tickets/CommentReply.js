import React from "react";
import styled from "styled-components";

import { getFormatedDate, capitalizeFirstLetter } from "../../utils/appUtils";

import { Comment } from "semantic-ui-react";

const StyledContent = styled.p`
  white-space: pre-wrap !important;
`;

export const CommentReply = ({ comments, parentId }) => {
  return Object.keys(comments).map(index => {
    const { username, timestamp, comment, parent, image } = comments[index];

    return (
      parent &&
      parentId === parent && (
        <Comment.Group>
          <Comment key={index}>
            <Comment.Avatar src={image} />
            <Comment.Content>
              <Comment.Author as="a">
                {capitalizeFirstLetter(username)}
              </Comment.Author>
              <Comment.Metadata>
                <small> Created {getFormatedDate(timestamp)}</small>
              </Comment.Metadata>
              <Comment.Text>
                <StyledContent>{comment}</StyledContent>
              </Comment.Text>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      )
    );
  });
};

export default CommentReply;
