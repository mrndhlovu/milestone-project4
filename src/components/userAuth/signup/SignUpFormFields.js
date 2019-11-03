import React from "react";

import { Form } from "semantic-ui-react";

const SignUpFormFields = ({ field, error, touched }) => {
  return (
    <Form.Input
      color="red"
      {...field.input}
      fluid
      icon={
        field.label === "Password" || field.label === "Confirm password"
          ? "lock"
          : field.label === "Email"
          ? "mail"
          : "user"
      }
      iconPosition="left"
      placeholder={field.label}
      autoComplete={
        field.label === "Password" || field.label === "Confirm password"
          ? "new-password"
          : field.label === "Email"
          ? "email"
          : field.name
      }
      type={
        field.label === "Password" || field.label === "Confirm password"
          ? "password"
          : "text"
      }
      error={error && touched ? error : null}
    />
  );
};

export default SignUpFormFields;
