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
import { getUserProfile, getComments } from "../../selectors/appSelectors";
import CommentReply from "./CommentReply";

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
      profile: { id }
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
    const { userComments } = this.props;

    if (prevProps.userComments !== userComments) {
      const { dataReceived } = userComments;
      dataReceived && window.location.reload();
    }
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
                      <Comment.Author as="a">
                        <Header as="h5">{username}</Header>
                      </Comment.Author>
                      <Comment.Metadata>
                        <Header as="h6">{getFormatedDate(timestamp)}</Header>
                      </Comment.Metadata>
                      <Comment.Text>{comment}</Comment.Text>
                      <Comment.Actions>
                        <Comment.Text
                          as="a"
                          onClick={() =>
                            this.setState({ hideReplyInput: !hideReplyInput })
                          }
                        >
                          <span color="blue"> Reply</span>
                        </Comment.Text>
                      </Comment.Actions>
                    </Comment.Content>

                    <Comment.Group>
                      <CommentReply comments={comments} parentId={id} />
                    </Comment.Group>
                  </Comment>

                  {!hideReplyInput && (
                    <Form reply>
                      <Form.TextArea
                        onChange={event =>
                          this.handleCreateComment(event, "reply")
                        }
                      />
                      <Button
                        content="submit reply"
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
    userComments: getComments(state),
    profile: getUserProfile(state)
  };
};

export default connect(
  mapStateToProps,
  { createComment, createReply }
)(withRouter(TicketComments));
