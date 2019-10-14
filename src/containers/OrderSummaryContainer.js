import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Card } from "semantic-ui-react";

import OrderSummary from "../components/ecommerce/OrderSummary";
import {
  fetchPendingOrder,
  removeItemFromCart
} from "../actions/CheckoutActions";
import { getCartPendingOrder } from "../selectors/appSelectors";

export class OrderSummaryContainer extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleRemoveClick(id, productId) {
    this.props.removeItemFromCart(id, productId);
  }

  render() {
    const { pendingOrders, history } = this.props;
    const count = pendingOrders.data.count ? pendingOrders.data.count : 0;
    return (
      <Card fluid>
        <OrderSummary
          pendingOrders={pendingOrders.data}
          handleRemoveClick={this.handleRemoveClick}
          history={history}
          count={count}
        />
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    pendingOrders: getCartPendingOrder(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchPendingOrder, removeItemFromCart }
)(withRouter(OrderSummaryContainer));
