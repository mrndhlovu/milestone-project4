import React from "react";

import { Container, Grid, Header, List } from "semantic-ui-react";
import FooterLinks from "./FooterLinks";

const NavFooter = () => {
  return (
    <Container>
      <Grid inverted columns={2}>
        <Grid.Column>
          <Header inverted as="h4" content="About" />
          <List link inverted>
            <List.Item href="https://github.com/mrndhlovu">
              <List.Icon
                name="github"
                size="large"
                verticalAlign="middle"
                color="blue"
              />
              GitHub
            </List.Item>
            <List.Item href="https://www.linkedin.com/in/mduduzi-ndhlovu/">
              <List.Icon
                name="linkedin"
                size="large"
                verticalAlign="middle"
                color="blue"
              />
              LinkedIn
            </List.Item>
          </List>
        </Grid.Column>

        <Grid.Column>
          <FooterLinks />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default NavFooter;
