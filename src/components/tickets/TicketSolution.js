import React from "react";

import { Accordion, Icon } from "semantic-ui-react";
import NotificationModal from "../sharedComponents/NotificationModal";

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
          <NotificationModal
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
