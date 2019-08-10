import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";

import { Button, Form, Message, Container } from "semantic-ui-react";

import { createTicket } from "../../actions/TicketActions";
import Slugify from "../../utils/Slugify";

export class CreateTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      errors: {
        title: "",
        subject: "",
        slug: "",
        other: "",
        description: "",
        owner: ""
      }
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
    const slug = Slugify(subject);
    const updatedValues = { ...values, slug };

    this.props.createTicket(updatedValues);
  }

  componentDidUpdate(prevProps) {
    const {
      errorAlert,
      ticket: { dataReceived }
    } = this.props;
    const { errors } = this.state;

    if (errorAlert !== prevProps.errorAlert) {
      if (errorAlert.alertMsg.subject) {
        this.setState({
          isLoading: false,
          errors: { ...errors, subject: errorAlert.alertMsg.subject }
        });
      }
      if (errorAlert.alertMsg.title) {
        this.setState({
          isLoading: false,
          errors: { ...errors, title: errorAlert.alertMsg.title }
        });
      }
      if (errorAlert.alertMsg.password2) {
        this.setState({
          isLoading: false,
          errors: { ...errors, slug: errorAlert.alertMsg.slug }
        });
      }

      if (errorAlert.alertMsg.errorAlert.owner) {
        this.setState({
          isLoading: false,
          errors: {
            ...errors,
            owner: errorAlert.alertMsg.errorAlert.owner.join()
          }
        });
      }

      if (errorAlert.alertMsg.description) {
        this.setState({
          isLoading: false,
          errors: { ...errors, description: errorAlert.alertMsg.description }
        });
      }
      if (errorAlert.alertMsg.errorAlert) {
        this.setState({
          isLoading: false,
          errors: {
            ...errors,
            other: errorAlert.alertMsg.errorAlert
          }
        });
      }
    }
    if (dataReceived) {
      const { id } = this.props.ticket.ticketsList.data;
      this.props.history.push(`/ticket/${id}`);
    }
  }

  render() {
    const { handleSubmit, field } = this.props;
    const {
      errors: { subject, title, description, slug, other, owner },

      isLoading
    } = this.state;

    return (
      <Container style={{ paddingTop: 20 }}>
        <Message
          header="Create a Ticket"
          content="Fill out the form below to create a ticket"
        />
        {subject || title || description || other || slug || owner ? (
          <Message
            size="small"
            error
            header="Error creating ticket: "
            content={
              subject || title || description || other || slug || owner
                ? owner
                : null
            }
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
            <Button color="blue" loading={isLoading}>
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
    errorAlert: state.errorAlert,
    authState: state.auth,
    ticket: state.ticket
  };
};

function validate(values) {
  // console.log("Form values: ", values);
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
