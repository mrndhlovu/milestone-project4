import React from "react";

import { Card, Header, Segment } from "semantic-ui-react";

const DashboardCardWrapper = ({ children, header, color }) => (
  <Card fluid padded="true">
    <Header as="h4" attached content={header} color={color} />

    <Segment attached>{children}</Segment>
  </Card>
);

export default DashboardCardWrapper;
