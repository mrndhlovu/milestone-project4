import React, { Component, Fragment } from "react";

import {
  Button,
  Form,
  Message,
  Select,
  TextArea,
  Container
} from "semantic-ui-react";

const TICKET_PRORITY_LEVELS = [
  { key: "LOW", value: "lw", text: "LOW" },
  { key: "MEDIUM", value: "md", text: "MEDIUM" },
  { key: "HIGH", value: "hg", text: "HIGH" }
];

export class CreateTicket extends Component {
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
