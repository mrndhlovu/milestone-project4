import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../../actions/index";

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: true,
      inputs: {
        username: "",
        password: ""
      }
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
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
    this.props.history.push("/");
  }

  componentDidMount() {}

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "50vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="/logo.png" />
            Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={event => this.handleInputChange("username", event)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={event => this.handleInputChange("password", event)}
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
)(Login);
