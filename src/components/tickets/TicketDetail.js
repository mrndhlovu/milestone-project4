import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

import {
  requestTicketsDetail,
  updatedTicketVote,
  deleteTicket
} from "../../actions/TicketActions";
import { getFormatedDate } from "../../constants/constants";
import TicketComments from "./TicketComments";
import UILoadingSpinner from "../../utils/UILoadingSpinner";

import {
  Button,
  Card,
  Container,
  Header,
  Message,
  Segment,
  Statistic,
  Icon
} from "semantic-ui-react";

const StyledSpan = styled.span`
  padding-left: 0.3rem !important;
  padding-top: 0.8rem !important;
`;

export class TicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeIsDisabled: true
    };
    this.handleVoteClick = this.handleVoteClick.bind(this);
    this.handleTicketDelete = this.handleTicketDelete.bind(this);
  }

  updateVoteCount() {
    const { votes } = this.props.ticket.ticket;
    this.setState({ voteCount: votes });
  }

  componentWillMount() {
    const { id } = this.props.match.params;

    this.props.requestTicketsDetail(id);
  }

  handleTicketDelete() {
    const { id } = this.props.match.params;
    this.props.deleteTicket(id);

    setTimeout(this.props.history.push(`/tickets/`), 1000);
  }

  handleVoteClick(ticketId) {
    this.props.updatedTicketVote(ticketId);
  }

  componentDidUpdate(prevProps) {
    const { votes } = this.props.ticket.ticket;
    const { vote } = this.props;

    if (prevProps.votes !== votes) {
      const { updated } = vote.voteStatus;
      updated && window.location.reload();
    }
  }

  render() {
    const { likeIsDisabled } = this.state;
    const {
      ticket: {
        dataReceived,
        isLoading,
        ticket: { title, created_at, description, votes, views, id, comments }
      },
      authUser: { isAuthenticated }
    } = this.props;

    return dataReceived && isLoading ? (
      <UILoadingSpinner />
    ) : (
      <Container style={{ paddingTop: 20 }}>
        <div style={{ paddingTop: 10 }}>
          <Button.Group floated="right">
            <Button color="blue" size="tiny" as={NavLink} to="/create-ticket">
              Create
            </Button>
            <Button color="blue" as={NavLink} to={`/edit-ticket/${id}`}>
              Edit
            </Button>
            <Button color="red" onClick={this.handleTicketDelete}>
              Delete
            </Button>
          </Button.Group>
        </div>
        <Header
          as="h3"
          color="blue"
          subheader={`Filed: ${getFormatedDate(created_at)}`}
        />

        <Card style={{ paddingLeft: 10 }} fluid>
          <Card.Content header={title} color="blue" />
          <Card.Content description={description} />
          <Card.Content extra>
            <Statistic.Group size="mini" color="grey">
              <Statistic>
                <Statistic.Value>{votes > 0 ? votes : 0}</Statistic.Value>
                <StyledSpan>
                  <Statistic.Label as="a">
                    <Icon
                      name="thumbs up"
                      size="large"
                      color="grey"
                      disabled={isAuthenticated && !likeIsDisabled}
                      onClick={() => this.handleVoteClick(id)}
                    />
                  </Statistic.Label>
                </StyledSpan>
              </Statistic>
              <Statistic>
                <Statistic.Value>{views > 0 ? views : 0}</Statistic.Value>
                <StyledSpan>
                  <Statistic.Label>Views</Statistic.Label>
                </StyledSpan>
              </Statistic>
            </Statistic.Group>
          </Card.Content>
        </Card>
        <Segment>
          {isAuthenticated ? (
            <TicketComments comments={comments} ticketId={id} />
          ) : (
            <Fragment>
              <Message warning attached>
                To view and make comments you need a
                <StyledSpan>
                  <NavLink to="/pricing">Unicorn Pro Account.</NavLink>
                </StyledSpan>
              </Message>
            </Fragment>
          )}
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    ticket: state.ticketDetail,
    ticketDelete: state.ticketUpdate,
    authUser: state.auth,
    vote: state.vote
  };
};

export default connect(
  mapStateToProps,
  { requestTicketsDetail, updatedTicketVote, deleteTicket }
)(TicketDetail);
