import React from "react";

import { Button, Table, Label } from "semantic-ui-react";

export const CartFooter = ({ total }) => {
  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="6" textAlign="right">
          <Button as="div" labelPosition="right">
            <Button color="orange">Total €</Button>
            <Label as="a" basic pointing="left">
              {total}
            </Label>
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
};

export default CartFooter;
