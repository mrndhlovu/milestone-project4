import React, { Fragment } from "react";

import { List, Segment } from "semantic-ui-react";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";

export const CartItem = ({ cartItems, showDeleteButton, removeFromCart }) => {
  const { data } = cartItems;

  return data.ticket_orders ? (
    Object.keys(data.ticket_orders).map((item, index) => {
      const { ticket } = data.ticket_orders[item];

      return (
        <Fragment key={index}>
          <Segment>
            <List divided verticalAlign="middle">
              <List.Item>
                <List.Content floated="right"></List.Content>

                <List.Content>{ticket.toUpperCase()}</List.Content>
              </List.Item>
            </List>
          </Segment>
        </Fragment>
      );
    })
  ) : (
    <UILoadingSpinner />
  );
};

export default CartItem;
