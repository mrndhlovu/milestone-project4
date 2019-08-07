import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { reduxForm, Field } from "redux-form";

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
      errors: {
        email: "",
        password: "",
        password2: "",
        username: "",
        other: "",
        isLoading: ""
      }
    };

    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.renderField = this.renderField.bind(this);
  }

  handleSignupClick(values) {
    this.setState({ isLoading: true });
    const inputs = JSON.stringify({ values });

    this.props.signup(inputs);
  }

  componentDidUpdate(prevProps) {
    const {
      errorAlert,
      authState: { isAuthenticated }
    } = this.props;
    const { errors } = this.state;

    if (errorAlert !== prevProps.errorAlert) {
      if (errorAlert.alertMsg.errorAlert.email) {
        this.setState({
          isLoading: false,
          errors: { ...errors, email: errorAlert.alertMsg.errorAlert.email }
        });
      }
      if (errorAlert.alertMsg.errorAlertpassword) {
        this.setState({
          isLoading: false,
          errors: {
            ...errors,
            password: errorAlert.alertMsg.errorAlert.password
          }
        });
      }

      // if (errorAlert.alertMsg.errorAlert.detail) {
      //   alert.error(`Error: ${errorAlert.alertMsg.errorAlert.detail}`);
      // }

      if (errorAlert.alertMsg.errorAlert.username) {
        this.setState({
          errors: {
            isLoading: false,
            ...errors,
            username: errorAlert.alertMsg.errorAlert.username
          }
        });
      }
      if (errorAlert.alertMsg.errorAlert.non_field_errors) {
        this.setState({
          isLoading: false,
          errors: {
            ...errors,
            other: errorAlert.alertMsg.errorAlert.non_field_errors.join()
          }
        });
      }
    }
    if (isAuthenticated) {
      window.location.reload();
    }
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
      handleSubmit,
      authState: { isAuthenticated }
    } = this.props;
    const { buttonDisabled, isLoading } = this.state;
    const {
      errors: { email, password, password2, username, other }
    } = this.state;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <StyleContainer>
          <Header as="h3" color="teal" textAlign="center" centered="false">
            Create an Unicorn account
          </Header>

          <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 500 }}>
              {email || password || username || other || password2 ? (
                <Message
                  size="small"
                  error
                  header="Sign up error: "
                  content={email || password || username || other || password2}
                />
              ) : null}
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
                    color="teal"
                    fluid
                    size="large"
                    type="submit"
                    loading={isLoading ? true : false}
                  >
                    Sign up
                  </Button>
                </Segment>
              </Form>
              <Message attached="bottom">
                <StyledSpan>Already have an account?</StyledSpan>
                <Button
                  positive
                  onClick={this.showLoginModal}
                  disabled={buttonDisabled}
                >
                  Login
                </Button>
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
    errorAlert: state.errorAlert
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
