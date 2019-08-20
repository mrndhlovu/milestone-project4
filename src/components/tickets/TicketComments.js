import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  Divider,
  Icon,
  Button,
  Comment,
  Form,
  Message
} from "semantic-ui-react";

import { fetchComments } from "../../actions/TicketActions";
import { getFormatedDate } from "../../constants/constants";

export class TicketComments extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchComments();
  }

  renderComments() {
    const { commentsList } = this.props.comments;
    const ticketId = parseInt(this.props.match.params.id);

    return Object.keys(commentsList).map(index => {
      const { object_id, user, timestamp, comment } = commentsList[index];

      return object_id === ticketId ? (
        <Fragment key={index}>
          <Comment>
            <Icon disabled name="user" />
            <Comment.Content>
              <Comment.Author as="a">{user}</Comment.Author>
              <Comment.Metadata>
                <div>Date:{getFormatedDate(timestamp)}</div>
              </Comment.Metadata>
              <Comment.Text>{comment}</Comment.Text>
            </Comment.Content>
          </Comment>
        </Fragment>
      ) : (
        <Message key={index} warning attached>
          No comments yet
        </Message>
      );
    });
  }

  render() {
    return (
      <Fragment>
        <Comment.Group>
          <Divider />
          <Fragment>{this.renderComments()}</Fragment>
          <Form reply>
            <Form.TextArea />
            <Button
              content="add a comment"
              labelPosition="left"
              icon="edit"
              size="small"
              primary
            />
          </Form>
        </Comment.Group>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ticket: state.ticketDetail,
    authUser: state.auth,
    vote: state.vote,
    comments: state.comments
  };
};

export default connect(
  mapStateToProps,
  { fetchComments }
)(withRouter(TicketComments));
