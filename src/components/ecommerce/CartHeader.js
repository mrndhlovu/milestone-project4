import React from "react";

import { Table } from "semantic-ui-react";

const CartHeader = ({ count }) => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan="6">
          {count > 0
            ? `Your have ${count} ${count > 1 ? "items" : "item"} in your cart`
            : "Your cart is empty"}
        </Table.HeaderCell>
      </Table.Row>

      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Item name</Table.HeaderCell>
        <Table.HeaderCell>Subtotal</Table.HeaderCell>
        <Table.HeaderCell>Total</Table.HeaderCell>
        <Table.HeaderCell textAlign="right">Confirm</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
};

export default CartHeader;
