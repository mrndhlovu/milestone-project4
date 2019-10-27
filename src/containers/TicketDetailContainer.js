import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {
  requestTicketsDetail,
  updatedTicketVote,
  deleteTicket,
  fetchTicketSolution
} from "../actions/TicketActions";
import { addItemToCart } from "../actions/CheckoutActions";

import { Container, Confirm } from "semantic-ui-react";

import {
  getVotes,
  getTicketDetail,
  getTicketUpdate,
  getSolution,
  getUserProfile,
  getUser
} from "../selectors/appSelectors";

import StyledMessage from "../components/sharedComponents/StyledMessage";
import CommentsContainer from "./CommentsContainer";
import TicketDetail from "../components/tickets/TicketDetail";
import TicketSolution from "../components/tickets/TicketSolution";
import { APP_TYPE } from "../constants/constants";
import DynamicHeader from "../components/sharedComponents/DynamicHeader";

const initialState = {
  index: 0,
  buttonText: "Add to Cart",
  showConfirmModal: false
};

export class TicketDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };

    this.handleVoteClick = this.handleVoteClick.bind(this);
    this.handleTicketDelete = this.handleTicketDelete.bind(this);
    this.handleAccordionClick = this.handleAccordionClick.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
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
    this.setState({ showConfirmModal: true });
  }

  handleCancel() {
    this.setState({ showConfirmModal: false });
  }

  handleConfirm() {
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
        data: { data, comments, isOwner, votes }
      },
      solution,
      user,
      auth
    } = this.props;
    const { activeIndex, index, buttonText, showConfirmModal } = this.state;
    const allAccess =
      user.dataReceived &&
      user.data.current_membership.membership.is_pro_member;

    return (
      dataReceived && (
        <Fragment>
          <DynamicHeader />
          <Container style={{ paddingTop: 50 }}>
            <Confirm
              open={showConfirmModal}
              cancelButton="Cancel"
              confirmButton="Yes delete"
              onCancel={() => this.handleCancel()}
              onConfirm={() => this.handleConfirm()}
            />

            <TicketDetail
              allAccess={allAccess}
              data={data}
              isLoading={isLoading}
              buttonText={buttonText}
              handleTicketDelete={this.handleTicketDelete}
              dataReceived={dataReceived}
              handleVoteClick={this.handleVoteClick}
              user={user.data}
              isOwner={isOwner}
              votes={votes}
            />

            {!data.is_bug && (
              <TicketSolution
                handleAccordionClick={this.handleAccordionClick}
                activeIndex={activeIndex}
                index={index}
                solution={solution.data}
                isAuthenticated={auth.isAuthenticated}
                addToCart={this.handleAddToCart}
                id={data.id}
                buttonText={buttonText}
                handleAddToCart={this.handleAddToCart}
              />
            )}

            {dataReceived && allAccess ? (
              <CommentsContainer
                comments={comments}
                ticketId={data.id}
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
        </Fragment>
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    solution: getSolution(state),
    ticket: getTicketDetail(state),
    ticketDelete: getTicketUpdate(state),
    user: getUserProfile(state),
    vote: getVotes(state),
    auth: getUser(state)
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
