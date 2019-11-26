import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchTicketsList } from "../actions/TicketActions";
import { addItemToCart, fetchPendingOrder } from "../actions/CheckoutActions";

import {
  getTicketList,
  getCartAddOrRemove,
  getUserProfile,
  getUser
} from "../selectors/appSelectors";
import TicketsList from "../components/tickets/TicketsList";
import { APP_TYPE } from "../constants/constants";

export class TicketsListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: "Add to cart"
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    this.props.fetchTicketsList();
  }

  handleAddToCart(id) {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.props.addItemToCart(id, APP_TYPE.ticket);
    } else {
      this.setState({ buttonText: "Login to Add to cart" });
    }
  }

  render() {
    const { ticketsList, user } = this.props;
    const { buttonText } = this.state;
    const allAccess =
      user.dataReceived &&
      user.data.current_membership.membership.is_pro_member;

    return (
      ticketsList.dataReceived && (
        <TicketsList
          tickets={ticketsList.data}
          isLoading={ticketsList.isLoading}
          buttonText={buttonText}
          allAccess={allAccess}
          handleAddToCart={this.handleAddToCart}
        />
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    ticketsList: getTicketList(state),
    ticketsCart: getCartAddOrRemove(state),
    user: getUserProfile(state),
    auth: getUser(state)
  };
};

TicketsListContainer.propTypes = {
  ticketsList: PropTypes.object.isRequired,
  ticketsCart: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  fetchTicketsList: PropTypes.func.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  fetchPendingOrder: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  fetchTicketsList,
  addItemToCart,
  fetchPendingOrder
})(TicketsListContainer);
