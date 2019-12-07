import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { reduxForm, Field } from "redux-form";
import PropTypes from "prop-types";

import { signup } from "../actions/AuthActions";

import { Form, Grid, Container, Image, Segment } from "semantic-ui-react";
import FormHeader from "../components/sharedComponents/FormHeader";
import Notification from "../components/sharedComponents/Notification";
import SubmitButton from "../components/sharedComponents/SubmitButton";
import ErrorMessage from "../components/sharedComponents/ErrorMessage";

import SignupFormFields from "../components/userAuth/signup/SignUpFormFields";
import { getUser, getErrors } from "../selectors/appSelectors";
import { DEFAULT_IMAGES } from "../constants/constants";
import { validate } from "../utils/appUtils";

const styles = {
  width: "100%",
  height: "100vh",
  opacity: "0.1",
  position: "fixed"
};

class SignupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      loginModal: false,
      isLoading: false,
      buttonDisabled: true,
      showError: true
    };

    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.renderField = this.renderField.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleSignupClick(values) {
    this.setState({ isLoading: true });

    this.props.signup(values);
  }

  handleDismiss() {
    this.setState({ showError: !this.state.showError });
  }

  componentDidUpdate() {
    const { auth } = this.props;

    auth.isAuthenticated && window.location.reload();
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
      auth: { isAuthenticated, hasError },
      auth
    } = this.props;
    const { isLoading, showError } = this.state;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Column style={{ paddingTop: 0, paddingLeft: 0 }}>
            <Image size="large" src={DEFAULT_IMAGES.signup} style={styles} />

            <FormHeader header="Lets get you setup for your Unicorn Account" />

            {hasError && showError && (
              <Grid textAlign="center" style={{ paddingBottom: 10 }}>
                <Grid.Column style={{ maxWidth: 700 }}>
                  <ErrorMessage
                    errors={auth.data}
                    handleDismiss={this.handleDismiss}
                  />
                </Grid.Column>
              </Grid>
            )}

            <Form size="large" onSubmit={handleSubmit(this.handleSignupClick)}>
              <Segment style={{ maxWidth: 700, margin: "0 auto" }}>
                <Container fluid>
                  <Field
                    name="username"
                    label="Username"
                    component={this.renderField}
                  />

                  <Field
                    name="email"
                    label="Email"
                    component={this.renderField}
                  />

                  <Field
                    name="password"
                    label="Password"
                    component={this.renderField}
                  />

                  <Field
                    name="confirm_password"
                    label="Confirm password"
                    component={this.renderField}
                  />

                  <SubmitButton
                    isLoading={isLoading}
                    buttonText="Sign up"
                    valid={valid}
                    pristine={pristine}
                    hasError={hasError}
                  />

                  <Notification
                    message="Already have an account?"
                    redirect="/login"
                    linkText="Login"
                    iconName="check circle outline"
                  />
                </Container>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: getUser(state),
    error: getErrors(state).alertMsg
  };
};

SignupContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  signup: PropTypes.func.isRequired
};

export default reduxForm({ validate, form: "LoginForm" })(
  connect(mapStateToProps, { signup })(SignupContainer)
);
