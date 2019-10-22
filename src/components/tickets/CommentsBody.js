import React, { Fragment } from "react";

import {
  Divider,
  Icon,
  Comment,
  Message,
  Header,
  Segment
} from "semantic-ui-react";

import CommentReply from "../tickets/CommentReply";
import CommentReplyInput from "../tickets/CommentReplyInput";
import { getFormatedDate } from "../../utils/appUtils";

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
  if (comments !== undefined) {
    return (
      <Fragment>
        <Header as="h4" content="Comments" />
        <Divider />

        {Object.keys(comments).map(index => {
          const { username, timestamp, comment, parent, id } = comments[index];

          return (
            !parent && (
              <Segment key={index}>
                <Comment>
                  <Icon disabled name="user" color="orange" />
                  <Comment.Content>
                    <Comment.Author as="a">
                      <Header as="h5" color="orange">
                        {username.toUpperCase()}
                      </Header>
                    </Comment.Author>
                    <Comment.Metadata>
                      <Header as="h5">{getFormatedDate(timestamp)}</Header>
                    </Comment.Metadata>
                    <Comment.Text as="h4">{comment}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Text
                        as="a"
                        onClick={() => handleReplyClick(index)}
                      >
                        <Header as="h5" color="teal">
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
                  showReplyInput={activeIndex === index && showReplyInput}
                  handleOnBlur={handleOnBlur}
                  buttonDisabled={buttonDisabled}
                />
              </Segment>
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
