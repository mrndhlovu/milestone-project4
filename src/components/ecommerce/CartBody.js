import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { Header, Icon, Card, Button } from "semantic-ui-react";

const StyledDiv = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`;

const CartBody = ({ orderItems, handleRemoveClick }) => {
  return Object.keys(orderItems).map((item, index) => {
    const { ticket, membership } = orderItems[item];
    const { id, price } = orderItems[item];

    const name = orderItems[item].ticket
      ? ticket
      : membership
      ? `Unicorn ${membership}`
      : `Kind Donation`;

    const productType = ticket
      ? "ticket"
      : membership
      ? "membership"
      : "donation";

    return (
      <StyledDiv key={index}>
        <Card fluid>
          <Card.Content>
            {ticket ? (
              <NavLink to={`ticket/${id}`}>
                <Card.Header>{name.toUpperCase()}</Card.Header>
              </NavLink>
            ) : (
              <Card.Header>{name.toUpperCase()}</Card.Header>
            )}
          </Card.Content>
          <Card.Content extra>
            <Card.Meta>Inc VAT</Card.Meta>
            <Header
              style={{ margin: 0 }}
              as="h4"
              content={`Price € ${price}`}
            />

            <Button
              basic
              color="orange"
              floated="right"
              size="tiny"
              onClick={() => handleRemoveClick(id, productType)}
            >
              <Icon disabled name="delete" size="small" />
              Remove
            </Button>
          </Card.Content>
        </Card>
      </StyledDiv>
    );
  });
};

export default CartBody;
