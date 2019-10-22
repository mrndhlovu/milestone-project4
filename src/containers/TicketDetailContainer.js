import React, { Component } from "react";
import { connect } from "react-redux";

import {
  requestTicketsDetail,
  updatedTicketVote,
  deleteTicket,
  fetchTicketSolution
} from "../actions/TicketActions";
import { addItemToCart } from "../actions/CheckoutActions";

import { Container } from "semantic-ui-react";

import {
  getVotes,
  getTicketDetail,
  getTicketUpdate,
  getSolution,
  getUserProfile
} from "../selectors/appSelectors";

import StyledMessage from "../components/sharedComponents/StyledMessage";
import TicketComments, { CommentsContainer } from "./CommentsContainer";
import TicketDetail from "../components/tickets/TicketDetail";
import TicketSolution from "../components/tickets/TicketSolution";
import { APP_TYPE } from "../constants/constants";

const initialState = {
  index: 0,
  buttonText: "Add to Cart"
};

export class TicketDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
    this.handleVoteClick = this.handleVoteClick.bind(this);
    this.handleTicketDelete = this.handleTicketDelete.bind(this);
    this.handleAccordionClick = this.handleAccordionClick.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.requestTicketsDetail(id);

    setTimeout(() => {
      this.props.fetchTicketSolution(id);
    }, 100);
  }

  componentDidUpdate(prevProps) {
    const { ticket, user } = this.props;

    if (prevProps.ticket.dataReceived !== ticket.dataReceived) {
      if (user.isAuthenticated) {
      }
    }
  }

  handleAccordionClick = () => {
    const { activeIndex, index } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handleAddToCart(id) {
    if (id) {
      return this.props.addItemToCart(id, APP_TYPE.ticket);
    }
    this.setState({ buttonText: "Login to Add to Cart" });
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
        data: { title, description, votes, views, id, comments, owner, is_bug }
      },
      solution,
      user
    } = this.props;
    const { activeIndex, index, buttonText } = this.state;
    const isProMember =
      user.dataReceived &&
      user.data.current_membership.membership.is_pro_member;

    return (
      <Container style={{ paddingTop: 50 }}>
        <TicketDetail
          isProMember={isProMember}
          description={description}
          votes={votes}
          title={title}
          views={views}
          id={id}
          isLoading={isLoading}
          buttonText={buttonText}
          handleTicketDelete={this.handleTicketDelete}
          owner={owner}
          dataReceived={dataReceived}
          handleVoteClick={this.handleVoteClick}
        />

        {!is_bug && (
          <TicketSolution
            handleAccordionClick={this.handleAccordionClick}
            activeIndex={activeIndex}
            index={index}
            solution={solution.data}
            isAuthenticated={user.isAuthenticated}
            addToCart={this.handleAddToCart}
            id={id}
            buttonText={buttonText}
            handleAddToCart={this.handleAddToCart}
          />
        )}

        {isProMember ? (
          <CommentsContainer
            comments={comments}
            ticketId={id}
            isTicket={true}
          />
        ) : (
          <StyledMessage
            message="To view and make comments you need a "
            linkText="Unicorn Pro Account."
            redirect="/pricing"
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    solution: getSolution(state),
    ticket: getTicketDetail(state),
    ticketDelete: getTicketUpdate(state),
    user: getUserProfile(state),
    vote: getVotes(state)
  };
};

export default connect(
  mapStateToProps,
  {
    requestTicketsDetail,
    updatedTicketVote,
    deleteTicket,
    fetchTicketSolution,
    addItemToCart
  }
)(TicketDetailContainer);
