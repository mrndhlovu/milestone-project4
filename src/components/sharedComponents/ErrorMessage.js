import React from "react";

import { Message } from "semantic-ui-react";

const ErrorMessage = ({ message }) => {
  return (
    <Message error size="small" attached>
      <Message.Header>{message}</Message.Header>
    </Message>
  );
};

export default ErrorMessage;
