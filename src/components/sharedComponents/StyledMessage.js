import React from "react";
import { NavLink } from "react-router-dom";

import { Header, Icon, Segment, Button } from "semantic-ui-react";

const StyledMessage = ({ redirect, linkText, message, iconName }) => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name={iconName} />
        {message}
      </Header>

      <Button as={NavLink} to={redirect} primary>
        {linkText}
      </Button>
    </Segment>
  );
};

export default StyledMessage;
