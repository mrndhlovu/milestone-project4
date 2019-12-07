import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

import { Form, Grid, Segment, Container, Image } from "semantic-ui-react";

import { getUser } from "../selectors/appSelectors";
import { login } from "../actions/AuthActions";
import FormFooter from "../components/sharedComponents/Notification";
import FormInput from "../components/sharedComponents/FormInput";
import FormHeader from "../components/sharedComponents/FormHeader";
import SubmitButton from "../components/sharedComponents/SubmitButton";
import ErrorMessage from "../components/sharedComponents/ErrorMessage";
import { DEFAULT_IMAGES } from "../constants/constants";
import { validate } from "../utils/appUtils";

const styles = {
  width: "100%",
  height: "100vh",
  opacity: "0.1",
  position: "fixed"
};

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showError: false,
      referrerRedirect: false
    };

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.renderField = this.renderField.bind(this);
  }

  componentDidMount() {
    const {
      location: { state }
    } = this.props;
    if (state !== null) {
      this.setState({ referrerRedirect: true });
    }
  }

  componentDidUpdate(prevProps) {
    const { auth } = this.props;

    if (prevProps.auth.hasError !== auth.hasError) {
      if (auth.hasError) {
        this.setState({ showError: true });
      }
    }
  }

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
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    const { isLoading, showError } = this.state;

    if (isAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <Fragment>
        <Image size="large" src={DEFAULT_IMAGES.signup} style={styles} />
        <Container style={{ paddingTop: 20 }}>
          <FormHeader header="Login" />

          <Grid textAlign="center" style={{ maxWidth: 700, margin: "0 auto" }}>
            <Grid.Column>
              {hasError && showError && (
                <ErrorMessage
                  style={{ paddingBottom: 10 }}
                  errors={auth.data}
                  handleDismiss={() => this.setState({ showError: !showError })}
                />
              )}
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
                    iconName="user plus"
                  />
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: getUser(state)
  };
};

LoginContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

export default reduxForm({ validate, form: "LoginForm" })(
  connect(mapStateToProps, { login })(LoginContainer)
);
