import React from "react";
import { NavLink } from "react-router-dom";

import { Menu, Icon, Header, Dropdown } from "semantic-ui-react";

export const Cart = ({ pendingOrders }) => {
  const { orders, count } = pendingOrders;

  const renderOrderItems = orderItems => {
    return Object.keys(orderItems).map((key, index) => {
      const { ticket, membership } = orderItems[key];
      const name = orderItems[key].ticket ? ticket : `Unicorn ${membership}`;

      return <Dropdown.Item key={index}>{name.toUpperCase()}</Dropdown.Item>;
    });
  };

  return (
    <Menu.Menu position="right" style={{ paddingRight: 10 }}>
      <Icon name="cart" color="orange" />
      <span style={{ paddingRight: 5 }}>{count}</span>
      <Dropdown text="Cart" pointing>
        <Dropdown.Menu>
          {renderOrderItems(orders)}s
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
