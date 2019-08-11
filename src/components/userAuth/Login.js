import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withRouter, NavLink } from "react-router-dom";
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
      isLoading: false
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
          autoComplete={
            field.label === " Password" ? "current-password" : "username"
          }
          type={field.label === "Password" ? "password" : "text"}
          error={touched && error ? error : null}
          pointing="below"
        />
      </Fragment>
    );
  }

  showErrorMessage() {
    const { errorAlert } = this.props.error;

    return Object.keys(errorAlert).map((error, index) => {
      const message = `${error.toUpperCase()}: ${errorAlert[error]}`;

      return <p key={index}>{message}</p>;
    });
  }

  // wait for updates then render components accorhing to new state
  componentDidUpdate() {
    const {
      auth: { isAuthenticated }
    } = this.props;

    // refresh page and keep the use on the on the protected component
    isAuthenticated &&
      privateRoutes.includes(window.location.pathname) &&
      this.props.history.push(`${this.props.match.url}`);
  }

  render() {
    const {
      valid,
      pristine,
      handleSubmit,
      auth: { isAuthenticated, hasError }
    } = this.props;
    const { isLoading } = this.state;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <StyleContainer>
          <Header as="h2" color="black" textAlign="center" centered="false">
            Login
          </Header>

          <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 500 }}>
              {hasError ? (
                <Message error size="small">
                  <Message.Header>
                    There seem to be a problem with:
                  </Message.Header>
                  {this.showErrorMessage()}
                </Message>
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
              </Form>
              <Message>
                <StyledSpan>Dont have an account?</StyledSpan>
                <NavLink to="/signup">Sign up</NavLink>
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
    error: state.errorAlert.alertMsg
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
