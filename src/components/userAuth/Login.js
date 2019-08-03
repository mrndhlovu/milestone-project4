import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";

import styled from "styled-components";
import { login } from "../../actions/AuthActions";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container
} from "semantic-ui-react";

// private routes which need require push('/') to avoid loading the modal reloading
const privateRoutes = ["/create-ticket", "/shopping-cart"];

const StyledSpan = styled.span`
  padding-right: 0.5rem;
`;

const StyleContainer = styled(Container)`
  padding: 10vh 0;
`;

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: { signInError: "" },
      isLoading: ""
    };

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.renderField = this.renderField.bind(this);
  }

  // request a login, and redirect to home page
  handleLoginClick(values) {
    this.setState({ isLoading: true });

    const { username, password } = values;
    this.props.login(username, password);
  }

  renderField(field) {
    const {
      meta: { touched, error }
    } = field;

    return (
      // redux form handling inputs
      <Fragment>
        <Form.Input
          color="red"
          {...field.input}
          fluid
          icon={field.label === "Password" ? "lock" : "user"}
          iconPosition="left"
          placeholder={field.label}
          autoComplete={field.name}
          type={field.label === "Password" ? "password" : "text"}
          error={touched && error ? error : null}
          pointing="below"
        />
      </Fragment>
    );
  }

  // wait for updates then render components accorhing to new state
  componentDidUpdate(prevProps) {
    const {
      errorAlert,
      auth: { isAuthenticated }
    } = this.props;

    const { errors } = this.state;

    if (errorAlert !== prevProps.errorAlert) {
      if (errorAlert.alertMsg.non_field_errors) {
        this.setState({
          isLoading: false,
          errors: {
            ...errors,
            signInError: errorAlert.alertMsg.non_field_errors
          }
        });
      }
      if (errorAlert.alertMsg.errorAlert.non_field_errors) {
        this.setState({
          isLoading: false,
          errors: {
            ...errors,
            signInError: errorAlert.alertMsg.errorAlert.non_field_errors
          }
        });
      }
    }
    if (isAuthenticated) {
      // refresh page and keep the use on the on the protected component
      if (privateRoutes.includes(window.location.pathname)) {
        this.props.history.push(`${this.props.match.url}`);
      }
    }
  }

  render() {
    const {
      handleSubmit,
      auth: { isAuthenticated }
    } = this.props;
    const {
      isLoading,
      errors: { signInError }
    } = this.state;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <StyleContainer>
          <Header as="h3" color="teal" textAlign="center" centered="false">
            Login
          </Header>

          <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 500 }}>
              {signInError ? (
                <Message
                  size="small"
                  error
                  header="Sign up error: "
                  content={signInError}
                />
              ) : null}
              <Form size="large" onSubmit={handleSubmit(this.handleLoginClick)}>
                <Segment stacked>
                  <Field
                    name="username"
                    label="Username"
                    component={this.renderField}
                  />
                  <br />
                  <Field
                    secureTextEntry={true}
                    name="password"
                    label="Password"
                    component={this.renderField}
                  />
                  <br />
                  <Button
                    color="teal"
                    fluid
                    size="large"
                    type="submit"
                    onClick={this.closeModal}
                    loading={isLoading ? true : false}
                  >
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                <StyledSpan>Dont have an account?</StyledSpan>
                <Button size="medium" positive onClick={this.showSignupModal}>
                  Sign up
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
    auth: state.auth,
    errorAlert: state.errorAlert
  };
};

// Handle redux form errors
function validate(values) {
  const formErrors = {};
  if (!values.username) {
    formErrors.username = "Enter a username";
  }
  if (!values.password) {
    formErrors.password = "Enter a password";
  }

  return formErrors;
}

export default reduxForm({ validate, form: "LoginForm" })(
  connect(
    mapStateToProps,
    { login }
  )(withRouter(LoginModal))
);
