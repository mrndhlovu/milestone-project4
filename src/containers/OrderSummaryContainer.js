import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import OrderSummary from "../components/ecommerce/OrderSummary";
import {
  fetchPendingOrder,
  removeItemFromCart
} from "../actions/CheckoutActions";
import { getCartPendingOrder } from "../selectors/appSelectors";
import Donations from "../components/ecommerce/Donations";
import { addItemToCart } from "../actions/CheckoutActions";
import styled from "styled-components";

import { Segment, Header } from "semantic-ui-react";

const StyledSegment = styled(Segment)`
  padding: 1rem 0 !important;
`;

export class OrderSummaryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donateIsDisable: true,
      buttonText: "Other amount",
      donation: 0
    };

    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleDonationInput = this.handleDonationInput.bind(this);
  }

  handleRemoveClick(id, productId) {
    this.props.removeItemFromCart(id, productId);
  }

  handleDonationInput(e) {
    // from stackoverflow
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({ donation: e.target.value });
    }
  }

  handleAddToCart(type, amount) {
    const { donation } = this.state;
    if (type === "button") {
      this.props.addItemToCart(null, "donation", amount);
    } else {
      const otherAmount = parseInt(donation);

      this.props.addItemToCart(null, "donation", otherAmount);
    }
  }

  render() {
    const { donateIsDisable, buttonText } = this.state;
    const { pendingOrders, history } = this.props;
    const count = pendingOrders.data.count ? pendingOrders.data.count : 0;

    return (
      <StyledSegment data-test-id="order-summary-page">
        {count > 0 && (
          <Header style={{ paddingLeft: 15 }}>
            Your have {count} {count > 1 ? "items" : "item"} in your cart.
          </Header>
        )}

        {count > 0 && (
          <OrderSummary
            pendingOrders={pendingOrders.data}
            handleRemoveClick={this.handleRemoveClick}
            history={history}
            count={count}
          />
        )}

        <Donations
          handleDonationInput={this.handleDonationInput}
          handlePayNow={this.handlePayNow}
          donateIsDisable={donateIsDisable}
          handleAddToCart={this.handleAddToCart}
          buttonText={buttonText}
        />
      </StyledSegment>
    );
  }
}

const mapStateToProps = state => {
  return {
    pendingOrders: getCartPendingOrder(state)
  };
};

OrderSummaryContainer.propTypes = {
  fetchPendingOrder: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
  addItemToCart: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  fetchPendingOrder,
  removeItemFromCart,
  addItemToCart
})(withRouter(OrderSummaryContainer));
