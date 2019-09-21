import React from "react";

import { Message } from "semantic-ui-react";

const ErrorMessage = ({ showErrorMessage }) => {
  return (
    <Message error size="small">
      <Message.Header>There seem to be a problem with:</Message.Header>
      {showErrorMessage()}
    </Message>
  );
};

export default ErrorMessage;
