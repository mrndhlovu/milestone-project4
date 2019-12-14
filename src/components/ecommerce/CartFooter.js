import React from "react";
import styled from "styled-components";

import { Label } from "semantic-ui-react";

const StyledDiv = styled.div`
  margin-left: 20px;
  padding-bottom: 10px;
`;

export const CartFooter = ({ total }) => {
  return (
    <StyledDiv>
      <Label size="large" as="a" basic pointing>
        Total € {total}
      </Label>
    </StyledDiv>
  );
};

export default CartFooter;
