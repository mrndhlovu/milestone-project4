import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { signup } from "../../actions/index";

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: true,
      inputs: {
        username: "",
        password1: "",
        password2: "",
        email: ""
      }
    };

    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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

    this.props.history.push("/");
  }

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
            Create an account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                autoComplete="username"
                placeholder="Username"
                required
                onChange={event => this.handleInputChange("username", event)}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                required
                onChange={event => this.handleInputChange("email", event)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password1"
                autoComplete="new-password"
                required
                onChange={event => this.handleInputChange("password1", event)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm password"
                autoComplete="new-password"
                type="password2"
                required
                onChange={event => this.handleInputChange("password2", event)}
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
    );
  }
}
export default connect(
  null,
  { signup }
)(Signup);
