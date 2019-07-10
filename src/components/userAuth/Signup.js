import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

const Signup = () => (
  <Grid textAlign="center" style={{ height: "50vh" }} verticalAlign="middle">
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
            placeholder="First Name"
          />
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Last Name"
          />
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Username"
          />
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="E-mail address"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password1"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Confirm password"
            type="password2"
          />

          <Button color="teal" fluid size="large">
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

export default Signup;
