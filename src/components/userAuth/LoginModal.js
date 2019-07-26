import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
// import { Input } from "react-native-elements";

import { login } from "../../actions/index";
import SignupModal from "./SignupModal";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Modal
} from "semantic-ui-react";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      signupModal: false,
      errors: { signInError: "" }
    };

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderField = this.renderField.bind(this);
    this.showSignupModal = this.showSignupModal.bind(this);
  }

  // request a login, and redirect to home page
  handleLoginClick(values) {
    const { username, password } = values;
    this.props.login(username, password);
  }

  closeModal() {
    window.location.reload();
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
          autoComplete={field.name}
          type={field.name}
          error={touched && error ? error : null}
          pointing="below"
        />
      </Fragment>
    );
  }

  showSignupModal() {
    this.setState({ showModal: false, signupModal: true });
  }

  componentDidUpdate(prevProps) {
    const {
      auth: { sessionToken },
      errorAlert
    } = this.props;

    const { errors } = this.state;

    if (errorAlert !== prevProps.errorAlert) {
      if (errorAlert.alertMsg.data) {
        this.setState({
          errors: {
            ...errors,
            signInError: errorAlert.alertMsg.data.join()
          }
        });
      }
    }

    return sessionToken ? window.location.reload() : null;
  }

  render() {
    const { handleSubmit } = this.props;
    const {
      showModal,
      signupModal,
      errors: { signInError }
    } = this.state;

    if (signupModal) {
      return <SignupModal />;
    }

    return (
      <div>
        <Modal
          open={showModal}
          show="blurring"
          closeIcon
          onClose={this.closeModal}
        >
          <Modal.Content>
            <Header as="h2" color="teal" textAlign="center" centered="false">
              Log-in to your account
            </Header>
            <Modal.Description>
              {signInError ? (
                <Message
                  size="small"
                  key={1}
                  error
                  header="Login error"
                  list={[signInError]}
                />
              ) : null}
              <Fragment>
                <Grid textAlign="center" verticalAlign="middle">
                  <Grid.Column style={{ maxWidth: 450 }}>
                    <Form
                      size="large"
                      onSubmit={handleSubmit(this.handleLoginClick)}
                    >
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
                        <Button color="teal" fluid size="large" type="submit">
                          Login
                        </Button>
                      </Segment>
                    </Form>
                    <Message attached="bottom">
                      New to us?
                      <Button positive onClick={this.showSignupModal}>
                        Sign Up
                      </Button>
                    </Message>
                  </Grid.Column>
                </Grid>
              </Fragment>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
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

  return formErrors;
}

export default reduxForm({ validate, form: "LoginForm" })(
  connect(
    mapStateToProps,
    { login }
  )(LoginModal)
);
