import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";

import { Button, Form, Message, Container } from "semantic-ui-react";

import { createTicket } from "../../actions/TicketActions";
import { slugify } from "../../constants/constants";
import { getErrors, getUser, getTicket } from "../../selectors/appSelectors";

export class CreateTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  componentDidUpdate() {
    const {
      ticket: { dataReceived }
    } = this.props;

    if (dataReceived) {
      const { id } = this.props.ticket.ticketsList.data;
      this.props.history.push(`/ticket/${id}`);
    }
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
    ) : (
      <Fragment>
        <Form.Input
          color="red"
          {...field}
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
    const { subject } = values;
    const slug = slugify(subject);
    const updatedValues = { ...values, slug };

    this.props.createTicket(updatedValues);
  }

  render() {
    const { handleSubmit, field, errorAlert } = this.props;
    const { isLoading } = this.state;

    return (
      <Container style={{ paddingTop: 20 }}>
        <Message
          header="Create a Ticket"
          content="Fill out the form below to create a ticket"
        />
        {errorAlert.status !== "" ? (
          <Message
            size="small"
            error
            header="Error creating ticket: "
            content={errorAlert.alertMsg}
          />
        ) : null}
        <Form
          className="attached fluid segment"
          onSubmit={handleSubmit(this.handleSubmitClick)}
        >
          <Field name="title" label="Title" component={this.renderField} />
          <Field name="subject" label="Subject" component={this.renderField} />
          <Field
            name="description"
            label="Description"
            component={this.renderField}
          />
          <Field
            {...field}
            name="prority_level"
            label="Priority"
            component="select"
            placeholder="Priority"
          >
            <option value="">Select priority level</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Field>
          <br />
          <div style={{ paddingTop: 10 }}>
            <Button
              color="blue"
              loading={isLoading}
              onClick={() => this.setState({ isLoading: true })}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorAlert: getErrors(state),
    authState: getUser(state),
    ticket: getTicket(state)
  };
};

function validate(values) {
  const formErrors = {};

  if (!values.title) {
    formErrors.title = "Enter a title";
  }
  if (!values.description) {
    formErrors.description = "Enter a description";
  }
  if (!values.subject) {
    formErrors.subject = "Enter a subject";
  }
  if (!values.prority_level) {
    formErrors.priority = "Enter a priotrity level";
  }

  return formErrors;
}

export default reduxForm({ validate, form: "CreateTicketForm" })(
  connect(
    mapStateToProps,
    { createTicket }
  )(withRouter(CreateTicket))
);
