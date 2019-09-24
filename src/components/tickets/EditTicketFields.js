import React, { Fragment } from "react";

import { Form, Input, TextArea } from "semantic-ui-react";

const EditTicketFields = ({ ticket, handleFieldChange }) => {
  const editField = ["description", "title", "subject", "priority_level"];

  return Object.keys(ticket).map((key, index) => {
    return (
      editField.includes(key) && (
        <Fragment key={index}>
          {key !== "description" ? (
            <Form.Field
              id={key}
              control={Input}
              label={key}
              defaultValue={ticket[key]}
              onChange={event => handleFieldChange(key, event)}
            />
          ) : (
            <Form.Field
              id={key}
              control={TextArea}
              label={key}
              defaultValue={ticket[key]}
              onChange={event => handleFieldChange(key, event)}
            />
          )}
        </Fragment>
      )
    );
  });
};

export default EditTicketFields;
