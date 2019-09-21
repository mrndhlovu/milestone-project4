import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { Menu, Icon, Label } from "semantic-ui-react";
import { getCartItems } from "../../utils/appCheckoutUtils";
import { getObjectLength } from "../../utils/appUtils";

const StyledCartSpan = styled.span``;

export const Cart = ({ data }) => {
  const itemCount = getObjectLength(data) + 1;
  return (
    getCartItems() && (
      <Menu.Item>
        <StyledCartSpan>
          <Label as={NavLink} to="/cart" color="black">
            <Icon name="cart" />
            {itemCount}
          </Label>
        </StyledCartSpan>
      </Menu.Item>
    )
  );
};

export default Cart;
