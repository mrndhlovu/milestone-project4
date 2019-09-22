import React from "react";

import { Card, Header, Segment } from "semantic-ui-react";

const DashboardCardWrapper = ({ children, header }) => (
  <Card fluid padded="true">
    <Header as="h4" attached content={header} />

    <Segment attached>{children}</Segment>
  </Card>
);

export default DashboardCardWrapper;
