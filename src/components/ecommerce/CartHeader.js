import React from "react";

import { Table } from "semantic-ui-react";

const CartHeader = ({ count }) => {
  return (
    <Table.Header>
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
