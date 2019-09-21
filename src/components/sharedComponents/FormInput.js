import React, { Fragment } from "react";

import { Form } from "semantic-ui-react";

const FormInput = ({ field, touched, error }) => {
  return (
    <Fragment>
      <Form.Input
        color="red"
        {...field.input}
        fluid
        icon={field.label === "Password" ? "lock" : "user"}
        iconPosition="left"
        placeholder={field.label}
        autoComplete={
          field.label === " Password" ? "current-password" : "username"
        }
        type={field.label === "Password" ? "password" : "text"}
        error={touched && error ? error : null}
        pointing="below"
      />
    </Fragment>
  );
};

export default FormInput;
