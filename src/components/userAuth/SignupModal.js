import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { signup } from "../../actions/index";
import LoginModal from "./LoginModal";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Modal
} from "semantic-ui-react";

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
    this.handleInputChange = this.handleInputChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showLoginModal = this.showLoginModal.bind(this);
    this.renderField = this.renderField.bind(this);
  }

  handleInputChange(fieldName, event) {
    this.setState({
      buttonDisabled: true,
      inputs: {
        ...this.state.inputs,
        [fieldName]: event.target.value
      }
    });
  }
  showLoginModal() {
    this.setState({ showModal: false, loginModal: true });
  }

  handleSignupClick(values) {
    this.setState({ isLoading: true });
    const { username, email, password, password2 } = values;
    const inputs = { username, email, password, password2 };
    this.props.signup(inputs);
  }

  closeModal() {
    window.location.reload();
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
      if (errorAlert.alertMsg.password2) {
        this.setState({
          errors: { ...errors, password2: errorAlert.alertMsg.password2 }
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
          icon={
            field.label === "Password" || field.label === "Confirm Password"
              ? "lock"
              : "user"
          }
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
    const { handleSubmit } = this.props;
    const { showModal, loginModal, buttonDisabled, isLoading } = this.state;
    const {
      errors: { email, password, password2, username, other }
    } = this.state;

    if (loginModal) {
      return <LoginModal />;
    }

    return (
      <div>
        <Modal
          open={showModal}
          show="blurring"
          closeIcon
          onClose={this.closeModal}
        >
          <Modal.Content image>
            <Modal.Description>
              <Header as="h2" color="teal" textAlign="center" centered="false">
                Create an account
              </Header>
              {email || password || password2 || username || other ? (
                <Message
                  size="small"
                  error
                  header="Sign up error: "
                  list={[email, password, password2, username, other]}
                />
              ) : null}
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
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
                        Signup
                      </Button>
                    </Segment>
                  </Form>
                  <Message attached="bottom">
                    Already have an account?
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
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
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
    formErrors.password2 = "Confirm your password";
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
