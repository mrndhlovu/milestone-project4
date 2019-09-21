import React from "react";
import { Field } from "redux-form";

import { NavLink } from "react-router-dom";

import styled from "styled-components";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container
} from "semantic-ui-react";
import FormInput from "../../sharedComponents/FormInput";

const StyledSpan = styled.span`
  padding-right: 0.5rem;
`;

const FormFields = ({ isLoading, hasError, valid, pristine, field }) => {
  const renderField = field => {
    const {
      meta: { touched, error }
    } = field;

    return <FormInput field={field} error={error} touched={touched} />;
  };
  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 500 }}>
        <Segment stacked>
          <Field
            name="username"
            label="Username"
            component={renderField(field)}
          />
          <br />
          <Field
            secureTextEntry={true}
            name="password"
            label="Password"
            component={renderField(field)}
          />
          <br />
          <Button
            color="blue"
            fluid
            size="large"
            type="submit"
            loading={isLoading && !hasError}
            disabled={(!valid || pristine) && true}
          >
            Login
          </Button>
        </Segment>

        <Message>
          <StyledSpan>Dont have an account?</StyledSpan>
          <NavLink to="/signup">Sign up</NavLink>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default FormFields;
