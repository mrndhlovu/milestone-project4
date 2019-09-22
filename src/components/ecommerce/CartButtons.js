import React from "react";
import { NavLink } from "react-router-dom";

import { Card, Button } from "semantic-ui-react";

export const CartButtons = ({ handleUpdate }) => {
  return (
    <Card.Content extra>
      <Button
        floated="right"
        color="grey"
        as={NavLink}
        to="/checkout"
        size="tiny"
      >
        Checkout
      </Button>
      <Button
        floated="right"
        color="grey"
        size="tiny"
        onClick={() => handleUpdate()}
      >
        Update
      </Button>
    </Card.Content>
  );
};

export default CartButtons;
