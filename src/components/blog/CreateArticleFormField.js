import React, { Fragment } from "react";

import { Form } from "semantic-ui-react";

const CreateArticleFormField = ({ field }) => {
  const {
    meta: { touched, error }
  } = field;
  return field.label === "Content" ? (
    <Fragment>
      <Form.TextArea
        style={{ minHeight: 300 }}
        color="red"
        {...field.input}
        placeholder={field.label}
        autoComplete={field.name}
        type={field.name}
        error={touched && error ? error : null}
      />
    </Fragment>
  ) : (
    <Fragment>
      <Form.Input
        color="red"
        {...field}
        icon="pencil alternate"
        placeholder={field.label}
        autoComplete={field.name}
        type={field.name}
        error={touched && error ? error : null}
      />
    </Fragment>
  );
};
export default CreateArticleFormField;
