import React from "react";

import { Label } from "semantic-ui-react";

export const CartFooter = ({ total }) => {
  return (
    <Label size="large" as="a" basic pointing>
      Total € {total}
    </Label>
  );
};

export default CartFooter;
