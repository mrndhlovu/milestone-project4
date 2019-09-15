import React from "react";
import { NavLink } from "react-router-dom";

import { Card, Button } from "semantic-ui-react";

export const CartButtons = ({ handleUpdate }) => {
  return (
    <Card.Content extra>
      <Button
        floated="right"
        color="orange"
        as={NavLink}
        to="/checkout"
        size="tiny"
      >
        Checkout
      </Button>
      <Button
        floated="right"
        color="orange"
        size="tiny"
        onClick={() => handleUpdate()}
      >
        Update
      </Button>
    </Card.Content>
  );
};

export default CartButtons;
