import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { reduxForm, Field } from "redux-form";

import styled from "styled-components";

import { signup } from "../actions/AuthActions";

import { Form, Grid, Segment, Container } from "semantic-ui-react";
import FormHeader from "../components/sharedComponents/FormHeader";
import FormFooter from "../components/sharedComponents/StyledMessage";
import SubmitButton from "../components/sharedComponents/SubmitButton";
import ErrorMessage from "../components/sharedComponents/ErrorMessage";

import SignupFormFields from "../components/userAuth/signup/SignUpFormFields";
import { getUser, getErrors } from "../selectors/appSelectors";

const StyleContainer = styled(Container)`
  padding: 10vh 0;
`;

class SignupContainer extends Component {
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

    return <SignupFormFields field={field} touched={touched} error={error} />;
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
          <FormHeader header="Lets get you setup for your Unicorn Account" />

          <Grid textAlign="center">
            <Grid.Column style={{ maxWidth: 500 }}>
              {hasError && (
                <ErrorMessage showErrorMessage={this.showErrorMessage} />
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

                  <SubmitButton
                    isLoading={isLoading}
                    buttonText="Sign up"
                    valid={valid}
                    pristine={pristine}
                    hasError={hasError}
                  />

                  <FormFooter
                    message="Already have an account?"
                    redirect="/login"
                    linkText="Login"
                  />
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </StyleContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    authState: getUser(state),
    error: getErrors(state).alertMsg
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
  )(SignupContainer)
);
