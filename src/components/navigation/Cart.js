import React from "react";
import { NavLink } from "react-router-dom";

import { Menu, Icon, Header, Dropdown } from "semantic-ui-react";

export const Cart = ({ pendingOrders }) => {
  const { orders, count } = pendingOrders;

  const renderOrderItems = orderItems => {
    return Object.keys(orderItems).map((key, index) => {
      const { ticket, membership } = orderItems[key];
      const name = orderItems[key].ticket
        ? ticket
        : membership
        ? `Unicorn ${membership}`
        : "Kind donation";

      return <Dropdown.Item key={index}>{name.toUpperCase()}</Dropdown.Item>;
    });
  };

  return (
    <Menu.Menu position="right" style={{ paddingRight: 10 }}>
      <NavLink to="/checkout">
        <Icon name="cart" color="orange" />
      </NavLink>
      <span style={{ paddingRight: 10 }}>{count}</span>
      <Dropdown text="Cart" pointing>
        <Dropdown.Menu>
          {renderOrderItems(orders)}
          <Dropdown.Divider />
          <Dropdown.Header>
            <Header
              content="Checkout"
              icon="shopping basket"
              size="tiny"
              as={NavLink}
              to="/checkout"
            />
          </Dropdown.Header>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  );
};

export default Cart;
