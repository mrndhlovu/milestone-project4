import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import OrderSummary from "../components/ecommerce/OrderSummary";
import { removeItemFromCart } from "../actions/CheckoutActions";
import Donations from "../components/ecommerce/Donations";
import { addItemToCart } from "../actions/CheckoutActions";

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
    const { pendingOrders, history, count } = this.props;
    const cartIsEmpty = count === 0;

    return (
      <div data-test-id="order-summary-page">
        {!cartIsEmpty && (
          <Fragment>
            <OrderSummary
              pendingOrders={pendingOrders.data}
              handleRemoveClick={this.handleRemoveClick}
              history={history}
              count={count}
            />
          </Fragment>
        )}

        <Donations
          handleDonationInput={this.handleDonationInput}
          handlePayNow={this.handlePayNow}
          donateIsDisable={donateIsDisable}
          handleAddToCart={this.handleAddToCart}
          buttonText={buttonText}
        />
      </div>
    );
  }
}

OrderSummaryContainer.propTypes = {
  removeItemFromCart: PropTypes.func.isRequired,
  addItemToCart: PropTypes.func.isRequired
};

export default connect(null, {
  removeItemFromCart,
  addItemToCart
})(withRouter(OrderSummaryContainer));
