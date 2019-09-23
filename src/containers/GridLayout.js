import React from "react";

import { Segment } from "semantic-ui-react";

const GridLayout = ({ children }) => {
  return (
    <Segment padded width={12}>
      {children}
    </Segment>
  );
};

export default GridLayout;
