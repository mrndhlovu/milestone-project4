import React from "react";

import StyledMessage from "../sharedComponents/StyledMessage";
import Tickets from "./Tickets";
import { getObjectLength } from "../../utils/appUtils";

import { Card, Segment } from "semantic-ui-react";

const TicketsList = ({
  tickets,
  isLoading,
  user,
  buttonText,
  handleAddToCart
}) => {
  const ticketCount = getObjectLength(tickets);

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header as="h3" content={`${ticketCount} TICKETS`} />
        <Segment attached stacked loading={isLoading}>
          {tickets.length > 0 ? (
            <Tickets
              handleAddToCart={handleAddToCart}
              ticketsList={tickets}
              user={user}
              buttonText={buttonText}
            />
          ) : (
            <StyledMessage
              message="No tickets at this time."
              redirect="/create-ticket"
              linkText="Create a ticket"
            />
          )}
        </Segment>
      </Card.Content>
    </Card>
  );
};

export default TicketsList;
