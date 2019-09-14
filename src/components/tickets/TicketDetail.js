import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

import {
  requestTicketsDetail,
  updatedTicketVote,
  deleteTicket
} from "../../actions/TicketActions";

import TicketComments from "./TicketComments";
import {
  getVotes,
  getUser,
  getTicketDetail,
  getTicketUpdate
} from "../../selectors/appSelectors";
import UILoadingSpinner from "../../utils/UILoadingSpinner";
import {
  isTicketOwner,
  hasProMembership,
  getFormatedDate
} from "../../utils/appUtils";

import EditButtons from "./EditButtons";

import {
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
        ticket: {
          title,
          created_at,
          description,
          votes,
          views,
          id,
          comments,
          owner
        }
      },
      authUser: { isAuthenticated }
    } = this.props;

    return dataReceived && isLoading ? (
      <UILoadingSpinner />
    ) : (
      <Container style={{ paddingTop: 20 }}>
        <div style={{ paddingTop: 10 }}>
          {isTicketOwner(owner) && hasProMembership() && (
            <EditButtons onDelete={this.handleTicketDelete} ticketId={id} />
          )}
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
          {hasProMembership() ? (
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
    ticket: getTicketDetail(state),
    ticketDelete: getTicketUpdate(state),
    authUser: getUser(state),
    vote: getVotes(state)
  };
};

export default connect(
  mapStateToProps,
  { requestTicketsDetail, updatedTicketVote, deleteTicket }
)(TicketDetail);
