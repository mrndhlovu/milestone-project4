import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { Container, Grid, Header, List } from "semantic-ui-react";

export class navFooter extends Component {
  render() {
    return (
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={4}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item href="https://github.com/mrndhlovu">
                  <List.Icon
                    name="github"
                    size="large"
                    verticalAlign="middle"
                  />
                  GitHub
                </List.Item>
                <List.Item href="https://www.linkedin.com/in/mduduzi-ndhlovu/">
                  <List.Icon
                    name="linkedin"
                    size="large"
                    verticalAlign="middle"
                  />
                  LinkedIn
                </List.Item>
              </List>
            </Grid.Column>

            <Grid.Column width={8}>
              <Header inverted as="h4" content="Menu" />
              <List link inverted>
                <List.Item as={NavLink} to="/blog-article-list">
                  Blog
                </List.Item>
                <List.Item as={NavLink} to="/cart">
                  Cart
                </List.Item>
                <List.Item as={NavLink} to="/pricing">
                  Pricing
                </List.Item>
                <List.Item as={NavLink} to="/tickets">
                  Tickets
                </List.Item>
                <List.Item as={NavLink} to="/products">
                  Products
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default navFooter;
