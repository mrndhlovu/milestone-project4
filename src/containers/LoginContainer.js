import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";

import styled from "styled-components";

import { Form, Grid, Segment, Container } from "semantic-ui-react";

import { getUser } from "../selectors/appSelectors";
import { login } from "../actions/AuthActions";
import FormFooter from "../components/sharedComponents/StyledMessage";
import FormInput from "../components/sharedComponents/FormInput";
import FormHeader from "../components/sharedComponents/FormHeader";
import SubmitButton from "../components/sharedComponents/SubmitButton";
import ErrorMessage from "../components/sharedComponents/ErrorMessage";

const privateRoutes = ["/create-ticket", "/checkout", "cart"];

const StyleContainer = styled(Container)`
  padding: 10vh 0;
`;

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.renderField = this.renderField.bind(this);
  }

  componentDidUpdate() {
    const {
      auth: { isAuthenticated }
    } = this.props;

    // refresh page and keep the use on the on the protected component
    isAuthenticated &&
      privateRoutes.includes(window.location.pathname) &&
      this.props.history.push(`${this.props.match.url}`);
  }

  // request a login, and redirect to home page
  handleLoginClick(data) {
    this.setState({ isLoading: true });
    this.props.login(data);
  }

  renderField(field) {
    const {
      meta: { touched, error }
    } = field;

    return <FormInput field={field} error={error} touched={touched} />;
  }

  render() {
    const {
      auth: { isAuthenticated, hasError },
      auth,
      valid,
      pristine,
      handleSubmit
    } = this.props;

    const { isLoading } = this.state;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <StyleContainer>
        <FormHeader header="Login" />

        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 500 }}>
            {hasError && <ErrorMessage errors={auth.data} />}
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
                <SubmitButton
                  isLoading={isLoading}
                  buttonText="Login"
                  valid={valid}
                  pristine={pristine}
                  hasError={hasError}
                />

                <FormFooter
                  message="Dont have an account?"
                  redirect="/signup"
                  linkText="Sign up"
                />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </StyleContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: getUser(state)
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

  return formErrors;
}

export default reduxForm({ validate, form: "LoginForm" })(
  connect(
    mapStateToProps,
    { login }
  )(withRouter(LoginContainer))
);
