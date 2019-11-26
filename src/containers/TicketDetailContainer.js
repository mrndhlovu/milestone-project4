import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {
  requestTicketsDetail,
  updatedTicketVote,
  deleteTicket,
  fetchTicketSolution,
  createComment,
  createReply
} from "../actions/TicketActions";
import { addItemToCart } from "../actions/CheckoutActions";

import { Confirm } from "semantic-ui-react";

import {
  getVotes,
  getTicketDetail,
  getTicketUpdate,
  getSolution,
  getUserProfile,
  getUser,
  getComments
} from "../selectors/appSelectors";

import TicketDetail from "../components/tickets/TicketDetail";
import { APP_TYPE, DEFAULT_IMAGES } from "../constants/constants";
import { refresh } from "../utils/appUtils";

const initialState = {
  index: 0,
  buttonText: "Add to Cart",
  showConfirmModal: false,
  title: "",
  image: ""
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
    const { ticket, ticketComments } = this.props;

    if (prevProps.ticket !== ticket) {
      if (ticket.dataReceived) {
        const { title } = ticket.data.data;
        this.setState({ title: title, image: DEFAULT_IMAGES.feature });
      }
    }

    if (prevProps.ticketComments !== ticketComments) {
      if (ticketComments.dataReceived) {
        refresh();
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
      ticket: { isLoading, dataReceived, data },
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
            handleVoteClick={this.handleVoteClick}
            user={user.data}
            activeIndex={activeIndex}
            solution={solution.data}
            index={index}
            isAuthenticated={auth.isAuthenticated}
            handleAccordionClick={this.handleAccordionClick}
            addToCart={this.handleAddToCart}
            createComment={this.props.createComment}
            createReply={this.props.createReply}
          />
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
    auth: getUser(state),
    ticketComments: getComments(state)
  };
};

export default connect(mapStateToProps, {
  requestTicketsDetail,
  updatedTicketVote,
  deleteTicket,
  fetchTicketSolution,
  addItemToCart,
  createComment,
  createReply
})(TicketDetailContainer);
