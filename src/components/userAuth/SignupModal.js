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
      loginModal: false
    };

    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showLoginModal = this.showLoginModal.bind(this);
  }

  handleInputChange(fieldName, event) {
    this.setState({
      buttonDisabled: false,
      inputs: {
        ...this.state.inputs,
        [fieldName]: event.target.value
      }
    });
  }
  showLoginModal() {
    console.log("Login modal");
    this.setState({ showModal: false, loginModal: true });
  }

  handleSignupClick(event) {
    const { inputs } = this.state;
    this.props.signup(inputs);
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
          icon={
            field.label === "Password" || field.label === "Confirm Password"
              ? "lock"
              : "user"
          }
          iconPosition="left"
          placeholder={field.label}
          autoComplete={field.name}
          type={field.name}
          error={touched && error ? error : null}
        />
      </Fragment>
    );
  }

  componentWillUpdate() {
    const { sessionToken } = this.props.authState;
    if (sessionToken) {
      window.location.reload();
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const { showModal, loginModal } = this.state;
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
                        name="password1"
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

                      <Button color="teal" fluid size="large" type="submit">
                        Signup
                      </Button>
                    </Segment>
                  </Form>
                  <Message attached="bottom">
                    Already have an account?
                    <Button positive onClick={this.showLoginModal}>
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
  console.log("State on sigup modal: ", state);
  return {
    authState: state.auth
  };
};

function validate(values) {
  const formErrors = {};
  if (!values.username) {
    formErrors.username = "Enter a username";
  }
  if (!values.password1) {
    formErrors.password1 = "Enter a password";
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
