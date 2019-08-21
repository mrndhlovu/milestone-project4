import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { reduxForm, Field } from "redux-form";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

import { signup } from "../../actions/AuthActions";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container
} from "semantic-ui-react";

const StyleContainer = styled(Container)`
  padding: 10vh 0;
`;

const StyledSpan = styled.span`
  padding-right: 0.5rem;
`;

class SignupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      loginModal: false,
      isLoading: false,
      buttonDisabled: true,

      errors: {
        email: "",
        password: "",
        password2: "",
        username: "",
        other: ""
      }
    };

    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.renderField = this.renderField.bind(this);
  }

  handleSignupClick(values) {
    this.setState({ isLoading: true });
    this.props.signup(values);
  }

  componentDidUpdate() {
    const { isAuthenticated } = this.props.authState;

    isAuthenticated && window.location.reload();
  }

  showErrorMessage() {
    const { errorAlert } = this.props.error;

    return Object.keys(errorAlert).map((error, index) => {
      const message = `${error.toUpperCase()}: ${errorAlert[error]}`;

      return <p key={index}>{message}</p>;
    });
  }

  renderField(field) {
    const {
      meta: { touched, error }
    } = field;

    return (
      <Fragment>
        <Form.Input
          color="red"
          {...field.input}
          fluid
          icon={
            field.label === "Password" || field.label === "Confirm Password"
              ? "lock"
              : field.label === "Email"
              ? "mail"
              : "user"
          }
          iconPosition="left"
          placeholder={field.label}
          autoComplete={
            field.label === "Password" || field.label === "Confirm Password"
              ? "new-password"
              : field.label === "Email"
              ? "email"
              : field.name
          }
          type={
            field.label === "Password" || field.label === "Confirm Password"
              ? "password"
              : "text"
          }
          error={error && touched ? error : null}
        />
      </Fragment>
    );
  }

  render() {
    const {
      valid,
      pristine,
      handleSubmit,
      authState: { isAuthenticated, hasError }
    } = this.props;
    const { isLoading } = this.state;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <StyleContainer>
          <Header as="h2" textAlign="center" centered="false">
            Lets get you setup for your Unicorn Account
          </Header>

          <Grid textAlign="center">
            <Grid.Column style={{ maxWidth: 500 }}>
              {hasError && (
                <Message error size="small">
                  <Message.Header>
                    There seem to be a problem with:
                  </Message.Header>
                  {this.showErrorMessage()}
                </Message>
              )}
              <Form
                size="large"
                onSubmit={handleSubmit(this.handleSignupClick)}
              >
                <Segment stacked>
                  <Field
                    name="username"
                    label="Username"
                    component={this.renderField}
                  />
                  <br />
                  <Field
                    name="email"
                    label="Email"
                    component={this.renderField}
                  />
                  <br />
                  <Field
                    name="password"
                    label="Password"
                    component={this.renderField}
                  />
                  <Field
                    name="password2"
                    label="Confirm Password"
                    component={this.renderField}
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
                    Sign up
                  </Button>
                </Segment>
              </Form>
              <Message attached="bottom">
                <StyledSpan>Already have an account?</StyledSpan>
                <NavLink to="/login">Login</NavLink>
              </Message>
            </Grid.Column>
          </Grid>
        </StyleContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    authState: state.auth,
    error: state.errorAlert.alertMsg
  };
};

function validate(values) {
  const formErrors = {};

  if (!values.username) {
    formErrors.username = "Enter a username";
  }
  if (!values.password) {
    formErrors.password = "Enter a password";
  }

  if (!values.password2) {
    formErrors.password2 = "Enter a confirmation email";
  }
  if (!values.email) {
    formErrors.email = "Enter a Email";
  }

  return formErrors;
}

export default reduxForm({ validate, form: "LoginForm" })(
  connect(
    mapStateToProps,
    { signup }
  )(SignupModal)
);
