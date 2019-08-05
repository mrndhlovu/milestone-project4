import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

import { Container } from "semantic-ui-react";

import { Card, Button } from "semantic-ui-react";

export const StyledContainer = styled(Container)`
  padding-top: 1.5rem;
`;

export class Cart extends Component {
  render() {
    return (
      <div>
        <StyledContainer>
          <Card fluid>
            <Card.Content header="Your Cart" />
            <Card.Content description="description" />
            <Card.Content extra>
              <Button
                floated="right"
                color="orange"
                as={NavLink}
                to="/checkout"
              >
                Checkout
              </Button>
              <Button floated="right" color="orange">
                Update
              </Button>
            </Card.Content>
          </Card>
        </StyledContainer>
      </div>
    );
  }
}

export default Cart;
