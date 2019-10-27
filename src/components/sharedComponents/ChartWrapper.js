import React from "react";
import styled from "styled-components";

import { Card, Icon } from "semantic-ui-react";

const StyledCard = styled(Card)`
  width: 100% !important;
  padding-right: 20px !important;
  padding-top: 20px !important;
`;

const ChartWrapper = ({ cardText, iconName, component }) => {
  return (
    <StyledCard>
      {component}
      <Card.Content extra>
        <Icon name={iconName} />
        {cardText}
      </Card.Content>
    </StyledCard>
  );
};

export default ChartWrapper;
