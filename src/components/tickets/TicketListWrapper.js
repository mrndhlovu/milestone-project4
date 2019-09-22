import React from "react";

import { Container, Header, List, Segment } from "semantic-ui-react";

const TicketListWrapper = ({ children, ticketCount, isLoading }) => {
  return (
    <Container>
      <Header
        content="TICKETS"
        subheader={`TOTAL:  ${ticketCount}`}
        as="h3"
        style={{ paddingTop: 20 }}
      />
      <Segment padded loading={isLoading} size="tiny">
        <List divided relaxed>
          {children}
        </List>
      </Segment>
    </Container>
  );
};

export default TicketListWrapper;
