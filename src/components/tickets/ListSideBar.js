import React from "react";
import { NavLink } from "react-router-dom";

import {
  Container,
  Header,
  Feed,
  Segment,
  Sidebar,
  Divider
} from "semantic-ui-react";

const ListSideBar = () => {
  return (
    <Sidebar.Pushable as={Segment}>
      <Segment basic>
        <Header as="h2">Browse Tickets</Header>
        <Divider />
      </Segment>
      <Container style={{ paddingLeft: 20, paddingBottom: 30 }}>
        <Feed.Event style={{ paddingBottom: 20 }}>
          <Feed.Content>
            <Feed.Summary>
              <span>Created by you </span>
              <NavLink to="/user-profile">22</NavLink>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Content>
            <Feed.Summary>
              <span>Created by you </span>
              <NavLink to="/user-profile">22</NavLink>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      </Container>
    </Sidebar.Pushable>
  );
};

export default ListSideBar;
