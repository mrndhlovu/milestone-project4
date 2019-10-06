import React, { Component } from "react";
import { connect } from "react-redux";

import {
  requestTicketsDetail,
  updatedTicketVote,
  deleteTicket
} from "../actions/TicketActions";

import TicketComments from "./TicketCommentsContainer";
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

import { Header, Segment } from "semantic-ui-react";
import TicketDetail from "../components/tickets/TicketDetail";
import GridLayout from "./GridLayout";

export class TicketDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleVoteClick = this.handleVoteClick.bind(this);
    this.handleTicketDelete = this.handleTicketDelete.bind(this);
  }

  // componentDidUpdate(prevProps) {
  //   const {
  //     vote,
  //     match: {
  //       // params: { id }
  //     }
  //   } = this.props;

  //   if (prevProps.vote !== vote) {
  //     // const { updated } = vote.data;
  //     console.log("updated");
  //   }
  // }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.requestTicketsDetail(id);
  }

  updateVoteCount() {
    const { votes } = this.props.ticket.ticket;
    this.setState({ voteCount: votes });
  }

  handleTicketDelete() {
    const { id } = this.props.match.params;
    this.props.deleteTicket(id);
    setTimeout(this.props.history.push(`/tickets`), 1000);
  }

  handleVoteClick(ticketId) {
    this.props.updatedTicketVote(ticketId);
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
      <GridLayout>
        {dataReceived && is_pro_member && (
          <EditButtons
            handleTicketDelete={this.handleTicketDelete}
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
      </GridLayout>
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
