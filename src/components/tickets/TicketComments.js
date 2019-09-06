import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  Divider,
  Icon,
  Button,
  Comment,
  Form,
  Message,
  Header
} from "semantic-ui-react";

import { getFormatedDate } from "../../constants/constants";
import { createComment, createReply } from "../../actions/TicketActions";

export class TicketComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      hideReplyInput: true,
      reply: ""
    };
    this.handleCreateComment = this.handleCreateComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCreateComment(event, commentOption) {
    const { value } = event.target;

    if (commentOption === "reply") {
      this.setState({ reply: value });
    } else {
      this.setState({ comment: value });
    }
  }

  handleSubmit(parentId) {
    const { comment, reply } = this.state;
    const {
      ticketId,
      createComment,
      createReply,
      user: { id }
    } = this.props;

    if (parentId !== null) {
      const replyBody = {
        user: id,
        object_id: ticketId,
        parent: parentId,
        comment: reply,
        content_type: "ticket"
      };

      createReply(replyBody);
    } else {
      const commentBody = {
        object_id: ticketId,
        comment: comment,
        content_type: "ticket"
      };

      createComment(commentBody);
    }
  }

  componentDidUpdate(prevProps) {
    const { commentsState } = this.props;

    if (prevProps.commentsState !== commentsState) {
      const { dataReceived } = commentsState;
      dataReceived && window.location.reload();
    }
  }

  renderReplys(parentId) {
    const { comments } = this.props;
    return Object.keys(comments).map(index => {
      const { username, timestamp, comment, parent } = comments[index];

      return (
        parent &&
        parentId === parent && (
          <Fragment key={index}>
            <Comment.Author as="a">{username}</Comment.Author>
            <Comment.Metadata>
              <div>Date:{getFormatedDate(timestamp)}</div>
            </Comment.Metadata>
            <Comment.Text>{comment}</Comment.Text>
          </Fragment>
        )
      );
    });
  }

  renderComments() {
    const { comments } = this.props;
    const { hideReplyInput } = this.state;

    if (comments !== undefined) {
      return (
        <Fragment>
          <Header as="h4" content="Comments" />
          <Divider />

          {Object.keys(comments).map(index => {
            const { username, timestamp, comment, parent, id } = comments[
              index
            ];

            return (
              !parent && (
                <Fragment key={index}>
                  <Comment>
                    <Icon disabled name="user" />
                    <Comment.Content>
                      <Comment.Author as="a">{username}</Comment.Author>
                      <Comment.Metadata>
                        <div>Date:{getFormatedDate(timestamp)}</div>
                      </Comment.Metadata>
                      <Comment.Text>{comment}</Comment.Text>
                      <Comment.Actions>
                        <Comment.Text
                          as="a"
                          onClick={() =>
                            this.setState({ hideReplyInput: !hideReplyInput })
                          }
                        >
                          Reply
                        </Comment.Text>
                      </Comment.Actions>
                    </Comment.Content>

                    <Comment.Group>{this.renderReplys(id)}</Comment.Group>
                  </Comment>

                  {!hideReplyInput && (
                    <Form reply>
                      <Form.TextArea
                        onChange={event =>
                          this.handleCreateComment(event, "reply")
                        }
                      />
                      <Button
                        content="Add Reply"
                        onClick={() => this.handleSubmit(id)}
                        labelPosition="left"
                        icon="edit"
                        size="tiny"
                        primary
                      />
                    </Form>
                  )}
                </Fragment>
              )
            );
          })}
        </Fragment>
      );
    } else {
      return <Message>No commets yet.</Message>;
    }
  }

  render() {
    return (
      <Comment>
        <Comment.Group>
          <Fragment>{this.renderComments()}</Fragment>

          <Form reply>
            <Form.TextArea onChange={e => this.handleCreateComment(e)} />
            <Button
              content="add a comment"
              labelPosition="left"
              icon="edit"
              size="small"
              primary
              onClick={() => this.handleSubmit(null)}
            />
          </Form>
        </Comment.Group>
      </Comment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ticket: state.ticketDetail,
    authUser: state.auth,
    vote: state.vote,
    commentsState: state.comments,
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  { createComment, createReply }
)(withRouter(TicketComments));
