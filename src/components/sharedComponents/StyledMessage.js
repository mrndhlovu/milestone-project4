import React from "react";
import { NavLink } from "react-router-dom";

import { Header, Icon, Segment, Button } from "semantic-ui-react";

const StyledMessage = ({ redirect, linkText, message }) => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="list alternate outline" />
        {message}
      </Header>

      <Button as={NavLink} to={redirect} primary>
        {linkText}
      </Button>
    </Segment>
  );
};

export default StyledMessage;
