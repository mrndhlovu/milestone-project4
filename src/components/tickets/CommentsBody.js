import React from "react";
import styled from "styled-components";

import { Comment } from "semantic-ui-react";

import CommentReply from "../tickets/CommentReply";
import CommentReplyInput from "../tickets/CommentReplyInput";
import { getFormatedDate, capitalizeFirstLetter } from "../../utils/appUtils";

const StyledContent = styled.p`
  white-space: pre-wrap !important;
`;

const CommentsBody = ({
  comments,
  handleReplyClick,
  handleCreateComment,
  handleSubmit,
  showReplyInput,
  buttonDisabled,
  handleOnBlur,
  activeIndex
}) => {
  return Object.keys(comments).map(index => {
    const { username, timestamp, comment, parent, id, image } = comments[index];

    return (
      !parent && (
        <Comment.Group key={index}>
          <Comment>
            <Comment.Avatar src={image} />

            <Comment.Content>
              <Comment.Author as="a">
                {capitalizeFirstLetter(username)}
              </Comment.Author>
              <Comment.Metadata>
                Created <small>{getFormatedDate(timestamp)}</small>
              </Comment.Metadata>
              <Comment.Text as="h4">
                <StyledContent>{comment}</StyledContent>
              </Comment.Text>
              <Comment.Actions>
                <Comment.Text
                  as="a"
                  color="blue"
                  onClick={() => handleReplyClick(index)}
                >
                  Reply
                </Comment.Text>
              </Comment.Actions>
              <CommentReply comments={comments} parentId={id} />
            </Comment.Content>

            <CommentReplyInput
              handleCreateComment={handleCreateComment}
              handleSubmit={handleSubmit}
              id={id}
              showReplyInput={activeIndex === index && showReplyInput}
              handleOnBlur={handleOnBlur}
              buttonDisabled={buttonDisabled}
            />
          </Comment>
        </Comment.Group>
      )
    );
  });
};

export default CommentsBody;
