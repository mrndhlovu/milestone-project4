import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { fetchTicketsList } from "../actions/TicketActions";
import { addItemToCart, fetchPendingOrder } from "../actions/CheckoutActions";
import HeadingImage from "../components/home/HeadingImage";
import { getTicketList, getCartAddOrRemove } from "../selectors/appSelectors";
import Tickets from "../components/tickets/Tickets";
import { getObjectLength } from "../utils/appUtils";
import TicketListWrapper from "../components/tickets/TicketListWrapper";
import StyledMessage from "../components/sharedComponents/StyledMessage";

import GridLayout from "./GridLayout";

export class TicketsListContainer extends Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    this.props.fetchTicketsList();
  }

  handleAddToCart(id) {
    this.props.addItemToCart(id, "ticket");
  }

  render() {
    const { ticketsList } = this.props;
    const ticketCount = getObjectLength(ticketsList.data);

    return (
      <Fragment>
        <HeadingImage />

        <GridLayout>
          <TicketListWrapper
            ticketCount={ticketCount}
            isLoading={ticketsList.isLoading}
          >
            {ticketsList.data.length > 0 ? (
              <Tickets
                ticketsList={ticketsList.data}
                handleAddToCart={this.handleAddToCart}
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
    ticketsCart: getCartAddOrRemove(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchTicketsList, addItemToCart, fetchPendingOrder }
)(TicketsListContainer);
