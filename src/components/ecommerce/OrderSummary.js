import React from "react";

import { Table } from "semantic-ui-react";

import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
import CartFooter from "./CartFooter";
import CartHeader from "./CartHeader";
import CartBody from "./CartBody";

const OrderSummary = ({
  pendingOrders,
  handleRemoveClick,
  history,
  count,
  total,
  width
}) => {
  const orderItems = pendingOrders.orders ? pendingOrders.orders : {};

  const isMobile = width <= 770;

  return pendingOrders !== {} ? (
    <Table celled striped>
      {!isMobile && <CartHeader count={count} />}

      <Table.Body>
        <CartBody
          orderItems={orderItems}
          total={total}
          history={history}
          handleRemoveClick={handleRemoveClick}
        />
      </Table.Body>

      <CartFooter total={pendingOrders.total} />
    </Table>
  ) : (
    <UILoadingSpinner />
  );
};

export default OrderSummary;
