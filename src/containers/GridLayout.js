import React from "react";

import { Grid } from "semantic-ui-react";

const GridLayout = ({ children }) => {
  return (
    <Grid celled="internally">
      <Grid.Row>
        <Grid.Column width={2} />
        <Grid.Column width={12}>{children}</Grid.Column>
        <Grid.Column width={2} />
      </Grid.Row>
    </Grid>
  );
};

export default GridLayout;
