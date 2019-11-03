import React from "react";

import { Message, Icon, Label, Header } from "semantic-ui-react";

const ErrorMessage = ({ errors, handleDismiss }) => {
  const renderErrors = () => {
    return Object.keys(errors).map(key => {
      return <Message.Item key={key}>{errors[key]}</Message.Item>;
    });
  };

  return (
    <Message error size="small" attached>
      <Header
        content="Error"
        color="black"
        textAlign="left"
        style={{ paddingBottom: 10 }}
      />

      <Label
        as="a"
        attached="top right"
        color="red"
        onClick={() => handleDismiss()}
      >
        dismiss
      </Label>
      <Message.Header>
        <Message.List>{renderErrors()}</Message.List>
      </Message.Header>
    </Message>
  );
};

export default ErrorMessage;
