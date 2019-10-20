import React from "react";

import { Card, Header, Segment } from "semantic-ui-react";

const DashboardCard = ({
  header,
  color,
  component,
  otherProps,
  subheader,
  isLoading,
  headerSize
}) => (
  <Card fluid padded="true">
    <Header
      as={headerSize}
      attached
      content={header}
      color={color}
      subheader={subheader}
    />
    <Segment attached stacked loading={isLoading}>
      {component}
    </Segment>
    {otherProps}
  </Card>
);

export default DashboardCard;
