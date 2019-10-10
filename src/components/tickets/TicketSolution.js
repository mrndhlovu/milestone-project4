import React from "react";

import { Accordion, Icon } from "semantic-ui-react";
import StyledMessage from "../sharedComponents/StyledMessage";

const TicketSolution = ({
  activeIndex,
  index,
  handleAccordionClick,
  solution,
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
        Solution
      </Accordion.Title>

      <Accordion.Content active={activeIndex === 0}>
        {solution.show ? (
          <p style={{ paddingLeft: 10 }}>{solution.solution}</p>
        ) : (
          <StyledMessage
            redirect={isAuthenticated ? "" : "/pricing"}
            linkText={isAuthenticated ? "Add to cart" : "Login"}
            message={
              isAuthenticated
                ? "To see the solution your have to pay 5 Euros"
                : "To see the solution you have to"
            }
          />
        )}
      </Accordion.Content>
    </Accordion>
  );
};

export default TicketSolution;
