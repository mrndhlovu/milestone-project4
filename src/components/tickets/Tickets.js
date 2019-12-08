import React from "react";
import { NavLink } from "react-router-dom";

import { Label, List, Icon, Table, Header, Button } from "semantic-ui-react";

import { getFormatedDate } from "../../utils/appUtils";

export const Tickets = ({ ticketsList, handleAddToCart, isAuthenticated }) => {
  const renderTicketCards = () => {
    return Object.keys(ticketsList).map(key => {
      const {
        title,
        id,
        created_at,
        views,
        votes,
        username,
        status,
        is_bug,
        has_solution
      } = ticketsList[key];

      return (
        <Table.Row key={id}>
          <Table.Cell>
            <Icon name={is_bug ? "bug" : "code"} />
          </Table.Cell>
          <Table.Cell>
            <List.Item>
              <NavLink to={`ticket/${id}`}>
                <Header
                  as="h5"
                  content={title.toUpperCase()}
                  data-test-id={`ticket-header-${id}`}
                />
              </NavLink>
              <span style={{ paddingRight: 10 }}>
                <Header
                  color="grey"
                  as="h5"
                  content={`Opened by ${username} ${getFormatedDate(
                    created_at
                  )}`}
                />
                <Icon name="eye" />
                {views} <Icon name="thumbs up" /> {votes}
              </span>
              <Label color={is_bug ? "grey" : "green"} horizontal>
                {status}
              </Label>
              <Label
                style={{ paddingLeft: 10 }}
                color={is_bug ? "red" : "blue"}
                horizontal
              >
                {is_bug ? "bug" : "feature"}
              </Label>
            </List.Item>
          </Table.Cell>
          <Table.Cell textAlign="right">
            {isAuthenticated && (
              <Button
                data-test-id={`add-ticket-to-cart-${id}`}
                color="orange"
                size="tiny"
                onClick={() => handleAddToCart(id)}
              >
                <Icon name="cart" />
                {has_solution ? "Get Solution" : "Need Fix Now"}
              </Button>
            )}
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  return (
    <Table data-test-id="ticket-list-table">
      <Table.Body>{renderTicketCards()}</Table.Body>
    </Table>
  );
};

export default Tickets;
