import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { fetchTicketsList, updatedTicketVote } from "../actions/TicketActions";
import { addItemToCart, fetchPendingOrder } from "../actions/CheckoutActions";
import HeadingImage from "../components/home/HeadingImage";
import {
  getTicketList,
  getCartAddOrRemove,
  getUser
} from "../selectors/appSelectors";
import Tickets from "../components/tickets/Tickets";
import { getObjectLength } from "../utils/appUtils";
import TicketListWrapper from "../components/tickets/TicketListWrapper";
import StyledMessage from "../components/sharedComponents/StyledMessage";
import GridLayout from "./GridLayout";

export class TicketsListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: ""
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    const { ticketsList } = this.props;
    this.props.fetchTicketsList();
    if (ticketsList.dataReceived) {
      this.setState({ tickets: ticketsList.data });
    }
  }

  handleVote(id) {
    const { user } = this.props;
    const isProMember =
      user.dataReceived && user.current_membership.membership.is_pro_member;

    if (isProMember) {
      this.props.updatedTicketVote(id);
    }
  }

  handleAddToCart(id) {
    this.props.addItemToCart(id, "ticket");
  }

  componentDidUpdate(prevProps) {
    const { ticketsList } = this.props;

    if (prevProps.ticketsList !== ticketsList) {
      if (ticketsList.dataReceived) {
        this.setState({ tickets: ticketsList.data });
      }
    }
  }

  render() {
    const { ticketsList, user } = this.props;
    const { tickets } = this.state;
    const ticketCount = getObjectLength(tickets);

    return (
      <Fragment>
        <HeadingImage />
        <GridLayout>
          <TicketListWrapper
            ticketCount={ticketCount}
            isLoading={tickets.isLoading}
          >
            {ticketsList.data.length > 0 ? (
              <Tickets
                ticketsList={tickets}
                handleAddToCart={this.handleAddToCart}
                handleVote={this.handleVote}
                user={user}
              />
            ) : (
              <StyledMessage
                message="No tickets at this time."
                redirect="/create-ticket"
                linkText="Create a ticket"
              />
            )}
          </TicketListWrapper>
        </GridLayout>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ticketsList: getTicketList(state),
    ticketsCart: getCartAddOrRemove(state),
    user: getUser(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchTicketsList, addItemToCart, fetchPendingOrder, updatedTicketVote }
)(TicketsListContainer);
