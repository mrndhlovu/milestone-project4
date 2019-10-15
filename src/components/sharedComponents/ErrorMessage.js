import React from "react";

import { Message } from "semantic-ui-react";

const ErrorMessage = ({ errors }) => {
  const renderErrors = () => {
    return Object.keys(errors).map(key => {
      return <Message.Item>{errors[key]}</Message.Item>;
    });
  };

  return (
    <Message error size="small" attached>
      <Message.Header>
        <Message.List>{renderErrors()}</Message.List>
      </Message.Header>
    </Message>
  );
};

export default ErrorMessage;
