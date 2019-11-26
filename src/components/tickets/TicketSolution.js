import React from "react";

import { Accordion, Icon, Segment, Button, Header } from "semantic-ui-react";

const TicketSolution = ({
  activeIndex,
  index,
  handleAccordionClick,
  addToCart,
  solution,
  id,
  buttonText,
  isAuthenticated
}) => {
  return (
    <Accordion styled fluid data-test-id="ticket-solution-container">
      <Accordion.Title
        active={activeIndex === 0}
        index={index}
        onClick={() => handleAccordionClick()}
        data-test-id="ticket-solution-accordion"
      >
        <Icon name="dropdown" />
        {solution.show ? "Paid Ticket Solution" : "Solution"}
      </Accordion.Title>

      <Accordion.Content active={activeIndex === 0}>
        {solution.show ? (
          <p style={{ paddingLeft: 10 }}>{solution.solution}</p>
        ) : (
          <Segment clearing>
            <Header as="h5">Ticket solution requires payment</Header>
            <Button
              data-test-id="ticket-solution-add-to-cart"
              size="tiny"
              color="orange"
              onClick={
                isAuthenticated ? () => addToCart(id) : () => addToCart()
              }
              floated="right"
            >
              {buttonText}
            </Button>
          </Segment>
        )}
      </Accordion.Content>
    </Accordion>
  );
};

export default TicketSolution;
