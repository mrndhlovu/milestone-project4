import React from "react";

import { Card, Table, List, Header } from "semantic-ui-react";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";

const OrderSummary = ({ pendingOrders, handleRemoveClick, history }) => {
  const orderItems = pendingOrders.orders ? pendingOrders.orders : {};

  const renderItems = () => {
    return Object.keys(orderItems).map((item, index) => {
      const { ticket, membership } = orderItems[item];
      const name = orderItems[item].ticket ? ticket : `Unicorn ${membership}`;
      const { id, price } = orderItems[item];
      const productId = ticket ? "ticket" : "membership";

      return (
        <Table.Row key={index}>
          <Table.Cell>
            <List.Header as="a" onClick={() => history.push(`ticket/${id}`)}>
              <span style={{ fontWeight: 700, color: "black" }}>
                {name.toUpperCase()}
              </span>
            </List.Header>
          </Table.Cell>
          <Table.Cell>${price}</Table.Cell>
          <Table.Cell>
            <span style={{ paddingRight: 30 }}>${price}</span>
            <List.Header
              as="a"
              onClick={() => handleRemoveClick(id, productId)}
            >
              <span style={{ fontSize: 10, color: "grey" }}>Remove</span>
            </List.Header>
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  return pendingOrders !== {} ? (
    <Card.Content>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item</Table.HeaderCell>
            <Table.HeaderCell>Item Price</Table.HeaderCell>
            <Table.HeaderCell>Total Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{renderItems()}</Table.Body>
      </Table>

      <Header as="h5" floated="right">
        <span>Total: $ {pendingOrders.total}</span>
      </Header>
    </Card.Content>
  ) : (
    <UILoadingSpinner />
  );
};

export default OrderSummary;
