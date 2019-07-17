import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { login } from "../../actions/index";

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
      showModal: true
    };

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderField = this.renderField.bind(this);
  }

  // request a login, and redirect to home page
  handleLoginClick(values) {
    const { username, password } = values;
    console.log("Values: ", values);

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
          error={touched ? error : null}
        />
      </Fragment>
    );
  }

  componentDidUpdate() {
    const { sessionToken } = this.props.auth;
    if (sessionToken) {
      window.location.reload();
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const { showModal, buttonDisabled } = this.state;

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
              <Fragment>
                <Grid textAlign="center" verticalAlign="middle">
                  <Grid.Column style={{ maxWidth: 450 }}>
                    <form
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
                          name="password"
                          label="Password"
                          component={this.renderField}
                        />
                        <br />

                        <Button color="teal" fluid size="large" type="submit">
                          Login
                        </Button>
                      </Segment>
                    </form>
                    <Message>
                      New to us? <Link to="/signup">Sign Up</Link>
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
    auth: state.auth
  };
};

function validate(values) {
  // console.log("values input", values);

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
