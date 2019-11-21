import React, { Fragment } from "react";
import { Form, Grid, Button } from "semantic-ui-react";

const EditProfile = ({ handleUpdateProfile, handleChange, userData }) => {
  const {
    first_name,
    last_name,
    current_membership: { bio, occupation }
  } = userData;

  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          label="Firstname"
          defaultValue={first_name}
          onChange={event => handleChange(event, "first_name")}
        />
        <Form.Input
          fluid
          label="Lastname"
          defaultValue={last_name}
          onChange={event => handleChange(event, "last_name")}
        />
        <Form.Input
          fluid
          label="Occupation"
          defaultValue={occupation}
          onChange={event => handleChange(event, "occupation")}
        />
      </Form.Group>

      <Form.TextArea
        label="About"
        defaultValue={bio}
        onChange={event => handleChange(event, "bio")}
      />

      <Form.Button
        color="blue"
        size="small"
        onClick={() => handleUpdateProfile()}
      >
        Submit
      </Form.Button>
    </Form>
  );
};

export default EditProfile;
