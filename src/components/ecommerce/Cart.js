import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

import { Card, Button, List, Container, Divider } from "semantic-ui-react";

export const StyledContainer = styled(Container)`
  padding-top: 1.5rem;
`;

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0.0
    };
  }

  renderCartItems() {
    const { total } = this.state;
    return (
      <List.Item>
        <List.Content>
          <List.Header as="a">Xian Famous Foods</List.Header>
          <List.Description>
            A taste of Shaanxi's delicious culinary traditions, with delights
            like spicy cold noodles and lamb burgers.
          </List.Description>
        </List.Content>

        <Divider />

        <List floated="right" horizontal>
          <List.Item>Total: ${total} </List.Item>
        </List>
      </List.Item>
    );
  }

  render() {
    return (
      <div>
        <StyledContainer>
          <Card fluid>
            <Card.Content header="Your Cart" />
            <Card.Content>
              <List divided relaxed>
                {this.renderCartItems()}
              </List>
            </Card.Content>
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
