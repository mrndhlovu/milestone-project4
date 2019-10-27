import React from "react";
import { NavLink } from "react-router-dom";

import { Label, List, Icon, Table, Header, Button } from "semantic-ui-react";

import { getFormatedDate } from "../../utils/appUtils";

export const Tickets = ({ ticketsList, handleAddToCart, user }) => {
  const allAccess =
    user.dataReceived && user.data.current_membership.membership.is_pro_member;

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
        is_feature
      } = ticketsList[key];

      return (
        <Table.Row>
          <Table.Cell>
            <Icon name={is_bug ? "bug" : "code"} />
          </Table.Cell>
          <Table.Cell>
            <List.Item>
              <NavLink to={`ticket/${id}`}>
                <Header as="h5" content={title.toUpperCase()} />
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
            # {id}
            <br />
            {is_feature && (
              <Button
                disabled={!allAccess}
                color="orange"
                floated="right"
                size="small"
                onClick={() => handleAddToCart(id)}
              >
                <Icon name="cart" color="white" />
                Add to cart
              </Button>
            )}
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  return (
    <Table>
      <Table.Body>{renderTicketCards()}</Table.Body>
    </Table>
  );
};

export default Tickets;
