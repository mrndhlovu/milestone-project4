import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {
  requestTicketsDetail,
  updatedTicketVote,
  deleteTicket
} from "../actions/TicketActions";

import TicketComments from "../components/tickets/TicketComments";
import {
  getVotes,
  getMembershipProfile,
  getTicketDetail,
  getTicketUpdate
} from "../selectors/appSelectors";

import { getFormatedDate } from "../utils/appUtils";
import StyledMessage from "../components/sharedComponents/StyledMessage";
import EditButtons from "../components/tickets/EditButtons";
import TicketDetailStats from "../components/tickets/TicketDetailStats";

import { Container, Header, Segment } from "semantic-ui-react";
import TicketDetail from "../components/tickets/TicketDetail";

export class TicketDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleVoteClick = this.handleVoteClick.bind(this);
    this.handleTicketDelete = this.handleTicketDelete.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.requestTicketsDetail(id);
  }

  componentDidUpdate(prevProps) {
    const { votes } = this.props.ticket.data;
    const { vote } = this.props;

    if (prevProps.votes !== votes) {
      const { updated } = vote.data;
      // updated && window.location.reload();
    }
  }

  updateVoteCount() {
    const { votes } = this.props.ticket.ticket;
    this.setState({ voteCount: votes });
  }

  handleTicketDelete() {
    const { id } = this.props.match.params;
    this.props.deleteTicket(id);
    setTimeout(this.props.history.push(`/tickets/`), 1000);
  }

  handleVoteClick(ticketId) {
    const { id } = this.props.match.params;

    this.props.updatedTicketVote(ticketId);

    this.props.requestTicketsDetail(id);
  }

  render() {
    const {
      ticket: {
        isLoading,
        dataReceived,
        data: {
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
      user: { is_pro_member }
    } = this.props;

    return (
      <Container style={{ paddingTop: 20 }}>
        {dataReceived && is_pro_member && (
          <EditButtons
            onDelete={this.handleTicketDelete}
            ticketId={id}
            owner={owner}
          />
        )}

        <Header
          as="h3"
          color="blue"
          subheader={`Filed: ${getFormatedDate(created_at)}`}
        />

        <TicketDetail
          handleVoteClick={this.handleVoteClick}
          is_pro_member={is_pro_member}
          description={description}
          votes={votes}
          title={title}
          views={views}
          id={id}
          isLoading={isLoading}
        />

        <TicketDetailStats
          handleVoteClick={this.handleVoteClick}
          is_pro_member={is_pro_member}
          votes={votes}
          views={views}
          id={id}
        />

        <Segment>
          {is_pro_member ? (
            <TicketComments comments={comments} ticketId={id} />
          ) : (
            <StyledMessage
              message="To view and make comments you need a "
              linkText="Unicorn Pro Account."
              redirect="/pricing"
            />
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
    user: getMembershipProfile(state),
    vote: getVotes(state)
  };
};

export default connect(
  mapStateToProps,
  { requestTicketsDetail, updatedTicketVote, deleteTicket }
)(TicketDetailContainer);
