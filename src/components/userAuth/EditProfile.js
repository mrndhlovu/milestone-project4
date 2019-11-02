import React, { Fragment } from "react";
import { Form, Grid, Button } from "semantic-ui-react";

const EditProfile = ({
  allAccess,
  handleCancelButtonClick,
  handleUpdateProfile,
  handleChange,
  userData
}) => {
  const {
    first_name,
    last_name,
    current_membership: {
      bio: { bio, occupation }
    }
  } = userData;

  return (
    <Grid stackable columns={2}>
      <Grid.Column width={12}>
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
      </Grid.Column>

      <Grid.Column width={4}>
        {allAccess ? (
          <Fragment>
            <p>
              <Button
                icon="delete"
                content="Deactivate account"
                fluid
                color="blue"
                as="a"
                onClick={() => handleCancelButtonClick("deactivate")}
              />
            </p>
            <p>
              <Button
                fluid
                icon="globe"
                content="Cancel Subscription"
                color="blue"
                as="a"
                onClick={() => handleCancelButtonClick("downgrade")}
              />
            </p>
          </Fragment>
        ) : (
          <Button
            icon="globe"
            content="Deactivate account"
            floated="right"
            color="blue"
            as="a"
            fluid
            onClick={() => handleCancelButtonClick("deactivate")}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default EditProfile;
