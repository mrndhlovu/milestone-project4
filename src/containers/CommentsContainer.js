import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { Comment, Segment, Header } from "semantic-ui-react";

import { COMMENT_TYPE, APP_TYPE } from "../constants/constants";
import CommentsBody from "../components/tickets/CommentsBody";
import CommentCreator from "../components/tickets/CommentCreator";

export const CommentsContainer = ({
  comments,
  ticketId,
  articleId,
  userId,
  isArticle,
  isTicket,
  createComment,
  createReply
}) => {
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  const [commentList, setCommentList] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [newComment, setNewComment] = useState(null);
  const [newReply, setNewReply] = useState(null);

  useEffect(() => {
    if (newComment) {
      createComment(newComment);
    }
    if (newReply) {
      createReply(newReply);
    }
    setCommentList(comments);
  }, [newComment, newReply]);

  function handleCreateComment(event, commentOption) {
    const { value } = event.target;
    const isCommentReply = commentOption === COMMENT_TYPE.reply;

    if (isCommentReply) {
      setReply(value);
    } else {
      setComment(value);
    }
  }

  function handleSubmit(parentId) {
    const isReply = parentId !== undefined;

    const commentBody = {
      user: userId,
      object_id: isArticle ? articleId : ticketId,
      comment: isReply ? reply : comment,
      parent: parentId,
      content_type: isTicket ? APP_TYPE.ticket : APP_TYPE.post
    };

    isReply ? setNewReply(commentBody) : setNewComment(commentBody);
  }

  function handleReplyClick(activeIndex) {
    setShowReplyInput(!showReplyInput);
    setActiveIndex(activeIndex);
  }

  const commentCount = Object.keys(comments).length || 0;

  return (
    <Segment>
      <Header
        content={`${commentCount} Comment${commentCount > 1 ? "s" : ""}`}
      />
      <Comment.Group>
        {commentCount > parseInt(0) && (
          <CommentsBody
            comments={commentList}
            handleReplyClick={handleReplyClick}
            handleSubmit={handleSubmit}
            handleCreateComment={handleCreateComment}
            showReplyInput={showReplyInput}
            buttonDisabled={buttonDisabled}
            handleOnBlur={() => setButtonDisabled(false)}
            activeIndex={activeIndex}
          />
        )}

        <CommentCreator
          handleCreateComment={handleCreateComment}
          handleOnBlur={() => setButtonDisabled(false)}
          handleSubmit={handleSubmit}
          buttonDisabled={buttonDisabled}
        />
      </Comment.Group>
    </Segment>
  );
};

export default withRouter(CommentsContainer);
