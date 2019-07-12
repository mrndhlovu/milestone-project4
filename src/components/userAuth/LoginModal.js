import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

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
      buttonDisabled: true,
      showModal: true,
      inputs: {
        username: "",
        password: ""
      }
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // collect form inputs
  handleInputChange(fieldName, event) {
    this.setState({
      buttonDisabled: false,
      inputs: {
        ...this.state.inputs,
        [fieldName]: event.target.value
      }
    });
  }

  // request a login, and redirect to home page
  handleLoginClick(event) {
    event.preventDefault();
    const { username, password } = this.state.inputs;
    this.props.login(username, password);
    this.closeModal();
  }

  closeModal() {
    window.location.reload();
  }

  componentDidMount() {}

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
          <Modal.Content>
            <Header as="h2" color="teal" textAlign="center" centered="false">
              Log-in to your account
            </Header>
            <Modal.Description>
              <Fragment>
                <Grid textAlign="center" verticalAlign="middle">
                  <Grid.Column style={{ maxWidth: 450 }}>
                    <Form size="large">
                      <Segment stacked>
                        <Form.Input
                          fluid
                          icon="user"
                          iconPosition="left"
                          placeholder="Username"
                          autoComplete="username"
                          onChange={event =>
                            this.handleInputChange("username", event)
                          }
                        />
                        <Form.Input
                          fluid
                          icon="lock"
                          iconPosition="left"
                          placeholder="Password"
                          autoComplete="new-password"
                          type="password"
                          onChange={event =>
                            this.handleInputChange("password", event)
                          }
                        />

                        <Button
                          color="teal"
                          fluid
                          size="large"
                          disabled={this.state.buttonDisabled}
                          onClick={this.handleLoginClick}
                        >
                          Login
                        </Button>
                      </Segment>
                    </Form>
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

export default connect(
  mapStateToProps,
  { login }
)(withRouter(LoginModal));