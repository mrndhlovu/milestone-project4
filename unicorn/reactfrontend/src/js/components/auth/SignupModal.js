import React, { Component, Fragment } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";

class SignupModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: true
    };

    this.handleHide = () => {
      window.location.reload();
    };
  }

  render() {
    return (
      <>
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Sign up
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>First name</Form.Label>
                <Form.Control type="email" placeholder="First name" />
              </Form.Group>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="email" placeholder="Last name" />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="validationCustomUsername">
                <Form.Label>Username</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Button type="submit">Signup</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default SignupModal;
