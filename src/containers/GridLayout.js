import React from "react";

import { Grid, Segment } from "semantic-ui-react";

const GridLayout = ({ children }) => {
  return (
    <Segment very padded width={12}>
      {children}
    </Segment>
  );
};

export default GridLayout;
