import React from "react";
import styled from "styled-components";

import { Icon, Label } from "semantic-ui-react";

const StyledDiv = styled.span`
  padding-left: 10px;
  padding-right: 10px;
  padding-right: ${props => props.mobile && "3px"};
`;

export const Cart = ({ pendingOrders, history, mobile }) => {
  return (
    <StyledDiv mobile={mobile}>
      <Label
        size="large"
        color="pink"
        circular
        as="a"
        onClick={() => history.push("/checkout")}
      >
        <Icon name="cart" corner />
        {pendingOrders}
      </Label>
    </StyledDiv>
  );
};

export default Cart;
