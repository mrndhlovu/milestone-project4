import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { Button, Form, Message, Container, Select } from "semantic-ui-react";

import { createTicket } from "../../actions/index";

const TICKET_PRORITY_LEVELS = [
  { key: "LOW", value: "lw", text: "LOW" },
  { key: "MEDIUM", value: "md", text: "MEDIUM" },
  { key: "HIGH", value: "hg", text: "HIGH" }
];

export class CreateTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputData: {}
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  renderField(field) {
    const {
      meta: { touched, error }
    } = field;

    return field.label === "Description" ? (
      <Fragment>
        <Form.TextArea
          color="red"
          {...field.input}
          placeholder={field.label}
          autoComplete={field.name}
          type={field.name}
          error={touched && error ? error : null}
        />
      </Fragment>
    ) : field.label === "Priority" ? (
      <Fragment>
        <Select
          color="red"
          // {...field.input}
          placeholder={field.label}
          error={touched && error ? error : null}
          options={TICKET_PRORITY_LEVELS}
        />
      </Fragment>
    ) : (
      <Fragment>
        <Form.Input
          color="red"
          {...field.input}
          icon="pencil alternate"
          placeholder={field.label}
          autoComplete={field.name}
          type={field.name}
          error={touched && error ? error : null}
        />
      </Fragment>
    );
  }

  handleSubmitClick(values) {
    console.log(values);
    this.props.createTicket(values);
  }

  componentWillUpdate() {
    const { sessionToken } = this.props.authState;
    if (sessionToken) {
      // window.location.reload();
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container style={{ paddingTop: 20 }}>
        <Message
          header="Create a Ticket"
          content="Fill out the form below to create a ticket"
        />
        <Form
          className="attached fluid segment"
          onSubmit={handleSubmit(this.handleSubmitClick)}
        >
          <Field name="title" label="Title" component={this.renderField} />
          <Field name="subject" label="Subject" component={this.renderField} />

          <Field
            name="username"
            label="Username"
            component={this.renderField}
          />
          <Field
            name="tags"
            label="Tags: e.g javascriprt, pyhton, django"
            component={this.renderField}
          />

          <Field
            name="description"
            label="Description"
            component={this.renderField}
          />
          <Field
            name="priority-level"
            label="Priority"
            component={this.renderField}
          />
          <br />
          <div style={{ paddingTop: 10 }}>
            <Button color="blue">Submit</Button>
          </div>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    authState: state.auth
  };
};

function validate(values) {
  const formErrors = {};
  if (!values.tags) {
    formErrors.tags = "Enter a tags";
  }
  if (!values.title) {
    formErrors.title = "Enter a title";
  }

  if (!values.username) {
    formErrors.username = "Enter a username";
  }

  if (!values.description) {
    formErrors.description = "Enter a description";
  }
  if (!values.subject) {
    formErrors.subject = "Enter a subject";
  }
  if (!values.priority_level) {
    formErrors.priority_level = "Enter a priotrity level";
  }

  return formErrors;
}

export default reduxForm({ validate, form: "CreateTicketForm" })(
  connect(
    mapStateToProps,
    { createTicket }
  )(CreateTicket)
);
