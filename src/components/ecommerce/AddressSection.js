import React from "react";
import styled from "styled-components";

import { Form, Grid, Container } from "semantic-ui-react";

import { Countries } from "../../constants/constants";

const StyledContainer = styled(Container)`
  padding: 0 10px 10px 10px !important;
`;

const AddressSection = () => {
  return (
    <Grid.Column>
      <StyledContainer placeholder>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              id="form-subcomponent-shorthand-input-first-name"
              label="Street Address"
              placeholder="Street Address"
            />
            <Form.Input fluid placeholder="Apart, suite or unit" label="*" />
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
      </StyledContainer>
    </Grid.Column>
  );
};

export default AddressSection;
