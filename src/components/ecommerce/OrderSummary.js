import React, { Fragment } from "react";

import CartFooter from "./CartFooter";
import CartBody from "./CartBody";

const OrderSummary = ({ pendingOrders, handleRemoveClick, history, total }) => {
  const orderItems = pendingOrders.orders ? pendingOrders.orders : {};

  return (
    <Fragment>
      <CartBody
        orderItems={orderItems}
        total={total}
        history={history}
        handleRemoveClick={handleRemoveClick}
      />

      <CartFooter total={pendingOrders.total} />
    </Fragment>
  );
};

export default OrderSummary;
