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
    const { username, email, password } = values;
    const inputs = { username, email, password };
    this.props.signup(inputs);
  }

  componentDidUpdate(prevProps) {
    const {
      errorAlert,
      authState: { isAuthenticated }
    } = this.props;
    const { errors } = this.state;

    if (errorAlert !== prevProps.errorAlert) {
      if (errorAlert.alertMsg.email) {
        this.setState({
          errors: { ...errors, email: errorAlert.alertMsg.email }
        });
      }
      if (errorAlert.alertMsg.password) {
        this.setState({
          errors: { ...errors, password: errorAlert.alertMsg.password }
        });
      }

      if (errorAlert.alertMsg.username) {
        this.setState({
          errors: { ...errors, username: errorAlert.alertMsg.username }
        });
      }
      if (errorAlert.alertMsg.non_field_errors) {
        this.setState({
          errors: {
            ...errors,
            other: errorAlert.alertMsg.non_field_errors.join()
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
          icon={field.label === "Password" ? "lock" : "user"}
          iconPosition="left"
          placeholder={field.label}
          autoComplete={field.password || field.password2 ? false : field.name}
          type={field.name}
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
      errors: { email, password, username, other }
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
          {email || password || username || other ? (
            <Message
              size="small"
              error
              header="Sign up error: "
              list={[email, password, username, other]}
            />
          ) : null}
          <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 500 }}>
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
