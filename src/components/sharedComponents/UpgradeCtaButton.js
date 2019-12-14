import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Button } from "semantic-ui-react";

const StyledSpan = styled.span`
  padding-left: 10px;
  padding-right: 10px;
`;
const UpgradeCtaButton = () => {
  return (
    <StyledSpan>
      <Button as={Link} to="/pricing" basic inverted>
        Upgrade
      </Button>
    </StyledSpan>
  );
};

export default UpgradeCtaButton;
