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
  isAuthenticated,
  handleAddToCart
}) => {
  return (
    <Accordion styled fluid>
      <Accordion.Title
        active={activeIndex === 0}
        index={index}
        onClick={() => handleAccordionClick()}
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
              size="tiny"
              color="orange"
              onClick={
                isAuthenticated ? () => addToCart(id) : () => handleAddToCart()
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
