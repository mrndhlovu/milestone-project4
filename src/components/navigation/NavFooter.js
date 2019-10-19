import React from "react";

import { Container, Grid, Header, List, Segment } from "semantic-ui-react";
import FooterLinks from "./FooterLinks";

const NavFooter = () => {
  return (
    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={8}>
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
              <FooterLinks />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default NavFooter;
