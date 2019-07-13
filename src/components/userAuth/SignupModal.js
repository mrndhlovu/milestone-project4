import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { signup } from "../../actions/index";

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
      buttonDisabled: true,
      showModal: true,
      inputs: {
        username: "",
        password1: "",
        password2: "",
        email: ""
      }
    };

    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  handleSignupClick(event) {
    event.preventDefault();
    const { inputs } = this.state;
    this.props.signup(inputs);

    this.closeModal();
  }

  closeModal() {
    window.location.reload();
  }

  render() {
    const { showModal } = this.state;
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
                  <Form size="large">
                    <Segment stacked>
                      <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        autoComplete="username"
                        placeholder="Username"
                        required
                        onChange={event =>
                          this.handleInputChange("username", event)
                        }
                      />
                      <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="E-mail address"
                        required
                        onChange={event =>
                          this.handleInputChange("email", event)
                        }
                      />
                      <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        type="password1"
                        autoComplete="new-password"
                        required
                        onChange={event =>
                          this.handleInputChange("password1", event)
                        }
                      />
                      <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="Confirm password"
                        autoComplete="new-password"
                        type="password2"
                        required
                        onChange={event =>
                          this.handleInputChange("password2", event)
                        }
                      />

                      <Button
                        color="teal"
                        fluid
                        size="large"
                        onClick={this.handleSignupClick}
                      >
                        Signup
                      </Button>
                    </Segment>
                  </Form>
                  <Message>
                    Already have an account? <Link to="/login">Login</Link>
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
    auth: state
  };
};
export default connect(
  mapStateToProps,
  { signup }
)(SignupModal);
