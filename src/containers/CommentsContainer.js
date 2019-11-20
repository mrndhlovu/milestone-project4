import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Button, Comment, Form, Segment, Header } from "semantic-ui-react";

import { COMMENT_TYPE, APP_TYPE } from "../constants/constants";
import { createComment, createReply } from "../actions/TicketActions";
import { getUserProfile, getComments } from "../selectors/appSelectors";
import CommentsBody from "../components/tickets/CommentsBody";

export class CommentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      reply: "",
      showReplyInput: false,
      buttonDisabled: true,
      activeIndex: 0
    };
    this.handleCreateComment = this.handleCreateComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReplyClick = this.handleReplyClick.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { commentsList } = this.props;

    if (prevProps.commentsList !== commentsList) {
      commentsList.dataReceived && window.location.reload();
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
      articleId,
      createComment,
      createReply,
      profile,
      isArticle,
      isTicket
    } = this.props;
    const id = profile.dataReceived && profile.data.id;

    if (isArticle && parentId !== null) {
      const replyBody = {
        user: id,
        object_id: articleId,
        parent: parentId,
        comment: reply,
        content_type: APP_TYPE.post
      };
      createReply(replyBody);
    } else if (isArticle) {
      const commentBody = {
        object_id: articleId,
        comment: comment,
        content_type: APP_TYPE.post
      };
      createComment(commentBody);
    }

    if (isTicket && parentId !== null) {
      const replyBody = {
        user: id,
        object_id: ticketId,
        parent: parentId,
        comment: reply,
        content_type: APP_TYPE.ticket
      };

      createReply(replyBody);
    } else if (isTicket) {
      const commentBody = {
        object_id: ticketId,
        comment: comment,
        content_type: APP_TYPE.ticket
      };

      createComment(commentBody);
    }
  }

  handleReplyClick(activeIndex) {
    this.setState({ showReplyInput: !this.state.showReplyInput, activeIndex });
  }

  render() {
    const { comments } = this.props;
    const { showReplyInput, buttonDisabled, activeIndex } = this.state;

    const commentCount = Object.keys(comments).length || 0;

    return (
      <Segment>
        <Header
          content={`${commentCount} Comment${commentCount > 1 ? "s" : ""}`}
        />
        <Comment.Group>
          {commentCount > parseInt(0) && (
            <CommentsBody
              comments={comments}
              handleReplyClick={this.handleReplyClick}
              handleSubmit={this.handleSubmit}
              handleCreateComment={this.handleCreateComment}
              showReplyInput={showReplyInput}
              buttonDisabled={buttonDisabled}
              handleOnBlur={this.handleOnBlur}
              activeIndex={activeIndex}
            />
          )}

          <Form reply>
            <Form.TextArea
              onClick={() => this.handleOnBlur()}
              onChange={e => this.handleCreateComment(e)}
            />
            <Button
              content="Comment"
              labelPosition="left"
              disabled={buttonDisabled}
              icon="edit"
              size="small"
              color="orange"
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
    commentsList: getComments(state),
    profile: getUserProfile(state)
  };
};

export default connect(mapStateToProps, { createComment, createReply })(
  withRouter(CommentsContainer)
);
