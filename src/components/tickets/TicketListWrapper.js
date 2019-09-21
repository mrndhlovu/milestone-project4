import React from "react";

import { Container, Header, List, Segment } from "semantic-ui-react";

const TicketListWrapper = ({ children, ticketCount }) => {
  return (
    <Container>
      <Header
        content="Tickets List"
        subheader={`Ticket count:  ${ticketCount}`}
        as="h4"
        style={{ paddingTop: 20 }}
      />
      <Segment attached>
        <Container>
          <List divided relaxed>
            {children}
          </List>
        </Container>
      </Segment>
    </Container>
  );
};

export default TicketListWrapper;
