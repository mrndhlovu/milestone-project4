import React, { Fragment } from "react";

import { Form, Input, TextArea } from "semantic-ui-react";
import { EDIT_FIELDS } from "../../constants/constants";

const EditFields = ({ editOption, handleFieldChange }) => {
  return Object.keys(editOption).map((key, index) => {
    return (
      EDIT_FIELDS.includes(key) && (
        <Fragment key={index}>
          {key === "content" || key === "description" ? (
            <Form.Field
              id={key}
              control={TextArea}
              style={{ minHeight: 300 }}
              label={key.toUpperCase()}
              defaultValue={editOption[key]}
              onChange={event => handleFieldChange(key, event)}
            />
          ) : (
            <Form.Field
              id={key}
              control={Input}
              label={key.toUpperCase()}
              defaultValue={editOption[key]}
              onChange={event => handleFieldChange(key, event)}
            />
          )}
        </Fragment>
      )
    );
  });
};

export default EditFields;
