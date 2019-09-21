import React from "react";

import { Form, Radio } from "semantic-ui-react";

const styles = {
  paddingTop: 20,
  paddingLeft: 15,
  paddingBottom: 10
};

const CreateTicketRadioButtons = ({ handleChange, isBug, isFeature }) => {
  return (
    <div style={styles}>
      <Form.Field>Selected ticket type</Form.Field>
      <Form.Field>
        <Radio
          label="Bug"
          name="radioGroup"
          value="bug"
          checked={isBug}
          onChange={() => handleChange()}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label="Feature"
          name="radioGroup"
          value="feature"
          checked={isFeature}
          onChange={() => handleChange()}
        />
      </Form.Field>
    </div>
  );
};

export default CreateTicketRadioButtons;
