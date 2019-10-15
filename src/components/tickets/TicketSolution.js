import React from "react";

import {
  Accordion,
  Icon,
  Segment,
  Button,
  Header,
  Popup
} from "semantic-ui-react";

const TicketSolution = ({
  activeIndex,
  index,
  handleAccordionClick,
  addToCart,
  solution,
  id,
  isAuthenticated
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
            <Popup
              content="Login or Signup to add item to cart"
              trigger={
                <Button
                  size="tiny"
                  color="orange"
                  onClick={isAuthenticated ? () => addToCart(id) : () => {}}
                  floated="right"
                >
                  Add to Cart
                </Button>
              }
            />
          </Segment>
        )}
      </Accordion.Content>
    </Accordion>
  );
};

export default TicketSolution;
