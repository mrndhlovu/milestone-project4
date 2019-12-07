import React from "react";

import { Form, Segment, Grid, Card } from "semantic-ui-react";

import { Countries } from "../../constants/constants";

const BillingDetails = () => {
  return (
    <div>
      <Card fluid>
        <Card.Content header="Billing Information" />
        <Grid.Column>
          <Segment attached="top">
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  id="form-subcomponent-shorthand-input-first-name"
                  label="Street Address"
                  placeholder="Street Address"
                />
                <Form.Input
                  fluid
                  placeholder="Apart, suite or unit"
                  label="*"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  id="form-subcomponent-shorthand-input-first-name"
                  label="City"
                  placeholder="City"
                />
                <Form.Input fluid placeholder="State" label="State" />
                <Form.Input fluid placeholder="Zip Code" label="Zip Code" />
              </Form.Group>
              <Form.Select
                fluid
                label="Country"
                options={Countries}
                placeholder="Country"
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Card>
    </div>
  );
};

export default BillingDetails;
