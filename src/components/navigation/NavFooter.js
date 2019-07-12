import React, { Component, Fragment } from "react";

import { Divider, Grid, Header, List } from "semantic-ui-react";

export class NavFooter extends Component {
  render() {
    return (
      <Fragment>
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Group 1" />
            <List link inverted>
              <List.Item as="a">Link One</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Group 2" />
            <List link inverted>
              <List.Item as="a">Link One</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Group 3" />
            <List link inverted>
              <List.Item as="a">Link One</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header inverted as="h4" content="Footer Header" />
            <p>
              Extra space for a call to action inside the footer that could help
              re-engage users.
            </p>
          </Grid.Column>
        </Grid>

        <Divider inverted section />
        <List horizontal inverted divided link size="small">
          <List.Item as="a" href="#">
            Site Map
          </List.Item>
          <List.Item as="a" href="#">
            Contact Us
          </List.Item>
          <List.Item as="a" href="#">
            Terms and Conditions
          </List.Item>
          <List.Item as="a" href="#">
            Privacy Policy
          </List.Item>
        </List>
      </Fragment>
    );
  }
}

export default NavFooter;
