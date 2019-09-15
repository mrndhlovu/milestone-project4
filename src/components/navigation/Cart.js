import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { Menu, Icon, Label } from "semantic-ui-react";

const StyledCartSpan = styled.span``;

export const Cart = ({ data }) => {
  const itemCount = Object.keys(data).length;
  return (
    <Menu.Item>
      <StyledCartSpan>
        <Label as={NavLink} to="/cart" color="black">
          <Icon name="cart" />
          {itemCount}
        </Label>
      </StyledCartSpan>
    </Menu.Item>
  );
};

export default Cart;
