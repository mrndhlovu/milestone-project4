import React from "react";
import { NavLink } from "react-router-dom";

import { Header, Icon, Segment, Button } from "semantic-ui-react";

const NotificationModal = ({
  redirect,
  linkText,
  message,
  iconName,
  dataTestId
}) => {
  return (
    <Segment placeholder data-test-id="notification-modal-container">
      <Header icon>
        <Icon name={iconName} size="tiny" />
        {message}
      </Header>

      {typeof redirect === "string" ? (
        <Button as={NavLink} to={redirect} primary data-test-id={dataTestId}>
          {linkText}
        </Button>
      ) : (
        <Button onClick={redirect} data-test-id={dataTestId} color="orange">
          {linkText}
          <Icon name="arrow right" />
        </Button>
      )}
    </Segment>
  );
};

export default NotificationModal;
