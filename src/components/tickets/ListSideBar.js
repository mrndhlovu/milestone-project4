import React, { Fragment } from "react";

import {
  Container,
  Header,
  Feed,
  Segment,
  Sidebar,
  Divider
} from "semantic-ui-react";
import { getTicketTotals, getObjectLength } from "../../utils/appUtils";

const ListSideBar = ({ data }) => {
  const { bugCount, featureCount, closed } = getTicketTotals(data);
  const total = getObjectLength(data);

  const FeedItem = ({ text, count }) => {
    return (
      <Fragment>
        <Feed.Event style={{ paddingBottom: 20 }}>
          <Feed.Content>
            <Feed.Summary>
              <Header floated="right" as="h2" color="grey" content={count} />
              <Header as="h5" color="grey" content={text} />
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
        <Divider />
      </Fragment>
    );
  };

  return (
    <Sidebar.Pushable as={Segment} data-test-id="side-bar-container">
      <Segment basic>
        <Header as="h2">Overall ticket stats</Header>
        <Divider />
      </Segment>
      <Container style={{ paddingLeft: 20, paddingBottom: 30 }}>
        <FeedItem text="Tickets opened" count={total} />
        <FeedItem text="Closed tickets" count={closed} />
        <FeedItem text="Features" count={featureCount} />
        <FeedItem text="Bugs" count={bugCount} />
      </Container>
    </Sidebar.Pushable>
  );
};

export default ListSideBar;
