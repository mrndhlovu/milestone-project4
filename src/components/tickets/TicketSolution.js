import React from "react";
import styled from "styled-components";

import { Accordion, Icon } from "semantic-ui-react";
import Notification from "../sharedComponents/Notification";

const StyledSpan = styled.span`
  font-size: 20px;
  color: black;
`;

const StyledContent = styled.p`
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  white-space: pre-wrap !important;
`;

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
        <StyledSpan>
          <Icon name="dropdown" />
          {solution.show ? "Paid Ticket Solution" : "Solution"}
        </StyledSpan>
      </Accordion.Title>

      <Accordion.Content active={activeIndex === 0}>
        {solution.show ? (
          <StyledContent>{solution.solution}</StyledContent>
        ) : (
          <Notification
            linkText={buttonText}
            message="Ticket solution requires payment"
            redirect={isAuthenticated ? () => addToCart(id) : () => addToCart()}
            iconName="content"
            dataTestId="ticket-solution-add-to-cart"
          />
        )}
      </Accordion.Content>
    </Accordion>
  );
};

export default TicketSolution;
