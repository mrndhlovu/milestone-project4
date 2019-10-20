import React from "react";

import { Table, List, Icon } from "semantic-ui-react";

const CartBody = ({ orderItems, handleRemoveClick, total, history }) => {
  return Object.keys(orderItems).map((item, index) => {
    const { ticket, membership } = orderItems[item];
    const { id, price } = orderItems[item];

    const name = orderItems[item].ticket
      ? ticket
      : membership
      ? `Unicorn ${membership}`
      : `[Kind Donation]`;

    const productId = ticket
      ? "ticket"
      : membership
      ? "membership"
      : "donation";

    return (
      <Table.Row key={index}>
        <Table.Cell>
          <List.Header as="a" onClick={() => history.push(`ticket/${id}`)}>
            <span style={{ fontWeight: 700, color: "black" }}>{id}</span>
          </List.Header>
        </Table.Cell>
        <Table.Cell textAlign="right">
          <List.Header as="a" onClick={() => history.push(`ticket/${id}`)}>
            <span style={{ fontWeight: 700, color: "black" }}>
              {name.toUpperCase()}
            </span>
          </List.Header>
        </Table.Cell>

        <Table.Cell textAlign="right">€ {price}</Table.Cell>
        <Table.Cell textAlign="right">
          <span>€ {price}</span>
        </Table.Cell>
        <Table.Cell textAlign="right">
          <List.Header as="a" onClick={() => handleRemoveClick(id, productId)}>
            <Icon disabled name="delete" size="large" />
          </List.Header>
        </Table.Cell>
      </Table.Row>
    );
  });
};

export default CartBody;
