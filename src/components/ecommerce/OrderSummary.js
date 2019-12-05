import React from "react";

import { Container } from "semantic-ui-react";

import CartFooter from "./CartFooter";
import CartBody from "./CartBody";

const OrderSummary = ({ pendingOrders, handleRemoveClick, history, total }) => {
  const orderItems = pendingOrders.orders ? pendingOrders.orders : {};

  return (
    <Container>
      <CartBody
        orderItems={orderItems}
        total={total}
        history={history}
        handleRemoveClick={handleRemoveClick}
      />

      <CartFooter total={pendingOrders.total} />
    </Container>
  );
};

export default OrderSummary;
