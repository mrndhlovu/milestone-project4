import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Button, Comment, Form, Segment } from "semantic-ui-react";

import { createComment, createReply } from "../actions/TicketActions";
import { getUserProfile, getComments } from "../selectors/appSelectors";
import CommentsBody from "../components/tickets/CommentsBody";
import { COMMENT_TYPE, APP_TYPE } from "../constants/constants";

export class TicketCommentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      reply: "",
      showReplyInput: false,
      buttonDisabled: true
    };
    this.handleCreateComment = this.handleCreateComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideReplyInput = this.hideReplyInput.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { userComments } = this.props;

    if (prevProps.userComments !== userComments) {
      const { dataReceived } = userComments;
      dataReceived && window.location.reload();
    }
  }

  handleOnBlur() {
    this.setState({ buttonDisabled: !this.state.buttonDisabled });
  }

  handleCreateComment(event, commentOption) {
    const { value } = event.target;

    if (commentOption === COMMENT_TYPE.reply) {
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
      profile: { id }
    } = this.props;

    if (parentId !== null) {
      const replyBody = {
        user: id,
        object_id: ticketId,
        parent: parentId,
        comment: reply,
        content_type: APP_TYPE.ticket
      };

      createReply(replyBody);
    } else {
      const commentBody = {
        object_id: ticketId,
        comment: comment,
        content_type: APP_TYPE.ticket
      };

      createComment(commentBody);
    }
  }

  hideReplyInput() {
    this.setState({ showReplyInput: !this.state.showReplyInput });
  }

  render() {
    const { comments } = this.props;
    const { showReplyInput, buttonDisabled } = this.state;

    return (
      <Segment>
        <Comment.Group>
          <CommentsBody
            comments={comments}
            hideReplyInput={this.hideReplyInput}
            handleSubmit={this.handleSubmit}
            handleCreateComment={this.handleCreateComment}
            showReplyInput={showReplyInput}
            buttonDisabled={buttonDisabled}
            handleOnBlur={this.handleOnBlur}
          />

          <Form reply>
            <Form.TextArea
              onClick={this.handleOnBlur}
              onChange={e => this.handleCreateComment(e)}
            />
            <Button
              content="add a comment"
              labelPosition="left"
              disabled={buttonDisabled}
              icon="edit"
              size="small"
              primary
              onClick={() => this.handleSubmit(null)}
            />
          </Form>
        </Comment.Group>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userComments: getComments(state),
    profile: getUserProfile(state)
  };
};

export default connect(
  mapStateToProps,
  { createComment, createReply }
)(withRouter(TicketCommentsContainer));
