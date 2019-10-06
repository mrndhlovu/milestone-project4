import React from "react";

import { Container, Header, Segment, Card } from "semantic-ui-react";

const TicketListWrapper = ({ children, ticketCount, isLoading }) => {
  return (
    <Container>
      <Card fluid>
        <Header
          content="TICKETS"
          subheader={`TOTAL:  ${ticketCount}`}
          as="h3"
          style={{ paddingTop: 20 }}
          attached
        />
        <Segment attached padded loading={isLoading} size="tiny">
          {children}
        </Segment>
      </Card>
    </Container>
  );
};

export default TicketListWrapper;
