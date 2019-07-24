import React, { Component } from "react";

import {
  Button,
  Form,
  Message,
  Select,
  TextArea,
  Container
} from "semantic-ui-react";

const TICKET_PRORITY_LEVELS = [
  { key: "LOW", value: "lw", text: "Low" },
  { key: "MEDIUM", value: "md", text: "Medium" },
  { key: "HIGH", value: "hg", text: "High" }
];

export class CreateTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container style={{ paddingTop: 20 }}>
        <Message
          header="Create a Ticket"
          content="Fill out the form below to create a ticket"
        />
        <Form className="attached fluid segment">
          <Form.Input fluid label="Title" placeholder="Title" type="text" />
          <Form.Input fluid label="Subject" placeholder="Subject" type="text" />

          <Form.Input label="Username" placeholder="Username" type="text" />
          <Form.Input
            label="Tags"
            placeholder="e.g: javascript, python, css, flask"
            type="text"
          />

          <Form.Field
            control={TextArea}
            label="Description"
            placeholder="Describe your issue..."
          />

          <Select
            placeholder="Ticket priority level"
            options={TICKET_PRORITY_LEVELS}
          />

          <Button color="blue" floated="right">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default CreateTicket;
