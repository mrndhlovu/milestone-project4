import React from "react";
import { Field } from "redux-form";

const CreateTicketDropdown = ({ field }) => {
  return (
    <Field
      {...field}
      name="prority_level"
      label="Priority"
      component="select"
      placeholder="Priority"
    >
      <option value="">Select priority level</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </Field>
  );
};

export default CreateTicketDropdown;
