import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Form,
  Icon,
  Message,
  Container,
  Select,
  TextArea
} from "semantic-ui-react";

const TICKET_PRORITY_LEVELS = [
  { key: "LOW", value: "lw", text: "LOW" },
  { key: "MEDIUM", value: "md", text: "MEDIUM" },
  { key: "HIGH", value: "hg", text: "HIGH" }
];

export class CreateTicket extends Component {
  render() {
    return (
      <Container text>
        <Message
          attached
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
          <Fragment>
            <Select
              placeholder="Ticket priority level"
              options={TICKET_PRORITY_LEVELS}
            />
          </Fragment>
          <br />
          <Button color="blue">Submit</Button>
        </Form>
        <Message attached="bottom" warning>
          <Icon name="help" />
          See Tickets&nbsp;
          <Button positive as={Link} to="/tickets">
            List
          </Button>
          &nbsp;instead.
        </Message>
      </Container>
    );
  }
}

export default CreateTicket;
