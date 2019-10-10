import React, { Fragment } from "react";

import { Form, Radio, Header } from "semantic-ui-react";

const CreateTicketRadioButtons = ({ handleChange, isBug, isFeature }) => {
  return (
    <Fragment style={{ paddingBottom: 10 }}>
      <Form.Field>
        <Header as="h4">Selected ticket type</Header>
      </Form.Field>
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
    </Fragment>
  );
};

export default CreateTicketRadioButtons;
