import React, { Component } from "react";
import { connect } from "react-redux";

import {
  requestTicketsDetail,
  updatedTicketVote,
  deleteTicket,
  fetchTicketSolution
} from "../actions/TicketActions";

import { Header, Segment } from "semantic-ui-react";

import {
  getVotes,
  getMembershipProfile,
  getTicketDetail,
  getTicketUpdate,
  getSolution,
  getUser
} from "../selectors/appSelectors";

import { getFormatedDate } from "../utils/appUtils";
import EditButtons from "../components/tickets/EditButtons";
import GridLayout from "./GridLayout";
import StyledMessage from "../components/sharedComponents/StyledMessage";
import TicketComments from "./TicketCommentsContainer";
import TicketDetail from "../components/tickets/TicketDetail";
import TicketDetailStats from "../components/tickets/TicketDetailStats";
import TicketSolution from "../components/tickets/TicketSolution";

export class TicketDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      index: 0
    };
    this.handleVoteClick = this.handleVoteClick.bind(this);
    this.handleTicketDelete = this.handleTicketDelete.bind(this);
    this.handleAccordionClick = this.handleAccordionClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.requestTicketsDetail(id);
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;
    const { ticket, user } = this.props;

    if (prevProps.ticket.dataReceived !== ticket.dataReceived) {
      if (user.isAuthenticated) {
        this.props.fetchTicketSolution(id);
      }
    }

    // const {
    //   vote,
    //   match: {
    //     // params: { id }
    //   }
    // } = this.props;

    // if (prevProps.vote !== vote) {
    //   // const { updated } = vote.data;
    //   console.log("updated");
    // }
  }

  handleAccordionClick = (e, titleProps) => {
    const { activeIndex, index } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

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
      userProfile: { is_pro_member },
      solution,
      user
    } = this.props;
    const { activeIndex, index } = this.state;

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

        <TicketSolution
          handleAccordionClick={this.handleAccordionClick}
          activeIndex={activeIndex}
          index={index}
          solution={solution.data}
          isAuthenticated={user.isAuthenticated}
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
    userProfile: getMembershipProfile(state),
    vote: getVotes(state),
    solution: getSolution(state),
    user: getUser(state)
  };
};

export default connect(
  mapStateToProps,
  { requestTicketsDetail, updatedTicketVote, deleteTicket, fetchTicketSolution }
)(TicketDetailContainer);
