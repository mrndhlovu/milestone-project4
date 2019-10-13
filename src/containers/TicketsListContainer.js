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
  }

  componentDidMount() {
    const { ticketsList } = this.props;
    console.log(ticketsList);
    this.props.fetchTicketsList();
    if (ticketsList.dataReceived) {
      this.setState({ tickets: ticketsList.data });
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
    console.log(user);

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
                handleVote={this.props.updatedTicketVote}
                isAuthenticated={user.isAuthenticated}
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
