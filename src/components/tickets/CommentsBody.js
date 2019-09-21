import React, { Fragment } from "react";

import { Divider, Icon, Comment, Message, Header } from "semantic-ui-react";

import CommentReply from "../tickets/CommentReply";
import CommentReplyInput from "../tickets/CommentReplyInput";
import { getFormatedDate } from "../../utils/appUtils";

const CommentsBody = ({
  comments,
  hideReplyInput,
  handleCreateComment,
  handleSubmit,
  showReplyInput,
  buttonDisabled,
  handleOnBlur
}) => {
  if (comments !== undefined) {
    return (
      <Fragment>
        <Header as="h4" content="Comments" />
        <Divider />

        {Object.keys(comments).map(index => {
          const { username, timestamp, comment, parent, id } = comments[index];

          return (
            !parent && (
              <Fragment key={index}>
                <Comment>
                  <Icon disabled name="user" />
                  <Comment.Content>
                    <Comment.Author as="a">
                      <Header as="h5">{username}</Header>
                    </Comment.Author>
                    <Comment.Metadata>
                      <Header as="h6">{getFormatedDate(timestamp)}</Header>
                    </Comment.Metadata>
                    <Comment.Text>{comment}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Text as="a" onClick={() => hideReplyInput()}>
                        <Header as="h5" color="blue">
                          Reply
                        </Header>
                      </Comment.Text>
                    </Comment.Actions>
                  </Comment.Content>
                  <CommentReply comments={comments} parentId={id} />
                </Comment>
                <CommentReplyInput
                  handleCreateComment={handleCreateComment}
                  handleSubmit={handleSubmit}
                  id={id}
                  showReplyInput={showReplyInput}
                  handleOnBlur={handleOnBlur}
                  buttonDisabled={buttonDisabled}
                />
              </Fragment>
            )
          );
        })}
      </Fragment>
    );
  } else {
    return <Message>No commets yet.</Message>;
  }
};

export default CommentsBody;
