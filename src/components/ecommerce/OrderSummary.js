import React from "react";

import { Table, List, Icon, Button, Label, Card } from "semantic-ui-react";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";

const OrderSummary = ({
  pendingOrders,
  handleRemoveClick,
  history,
  count,
  total
}) => {
  const orderItems = pendingOrders.orders ? pendingOrders.orders : {};

  const renderItems = () => {
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
          <Table.Cell>
            <List.Header as="a" onClick={() => history.push(`ticket/${id}`)}>
              <span style={{ fontWeight: 700, color: "black" }}>
                {name.toUpperCase()}
              </span>
            </List.Header>
          </Table.Cell>

          <Table.Cell>€ {price}</Table.Cell>
          <Table.Cell>
            <span>€ {price}</span>
          </Table.Cell>
          <Table.Cell textAlign="center">
            <List.Header
              as="a"
              onClick={() => handleRemoveClick(id, productId)}
            >
              <Icon disabled name="delete" size="small" />
            </List.Header>
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  return pendingOrders !== {} ? (
    <Card fluid>
      <Table stackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="6">
              {count > 0
                ? `Your have ${count} ${
                    count > 1 ? "items" : "item"
                  } in your cart`
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
        <Table.Body>{renderItems()}</Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="6" textAlign="right">
              <Button as="div" labelPosition="right">
                <Button color="orange">Total €</Button>
                <Label as="a" basic pointing="left">
                  {pendingOrders.total}
                </Label>
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Card>
  ) : (
    <UILoadingSpinner />
  );
};

export default OrderSummary;
