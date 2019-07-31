import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";

import { Button, Form, Message, Container, Dropdown } from "semantic-ui-react";

import { createTicket } from "../../actions/TicketActions";

const TICKET_PRORITY_LEVELS = [
  { value: "l", text: "Low" },
  { value: "m", text: "Medium" },
  { value: "h", text: "High" }
];

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
        description: ""
      }
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.onChange = this.onChange.bind(this);
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
    this.setState({ isLoading: true });
    this.props.createTicket(values);
  }

  onChange(event) {
    console.log(event);

    if (this.props.field.input.onChange && event != null) {
      return this.props.field.input.onChange(event.value);
    } else {
      return this.props.field.input.onChange(null);
    }
  }

  RenderSelectInput = field => {
    const {
      meta: { touched, error }
    } = field;
    console.log(field.input);
    return (
      <Fragment>
        <Form.Input>
          <Dropdown
            placeholder={field.label}
            fluid
            search
            selection
            error={touched && error ? error : null}
            options={TICKET_PRORITY_LEVELS}
          />
        </Form.Input>
      </Fragment>
    );
  };

  componentDidUpdate(prevProps) {
    const {
      errorAlert,
      // authState: { sessionToken },
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

      if (errorAlert.alertMsg.description) {
        this.setState({
          isLoading: false,
          errors: { ...errors, description: errorAlert.alertMsg.description }
        });
      }
      if (errorAlert.alertMsg) {
        this.setState({
          isLoading: false,
          errors: {
            ...errors,
            other: errorAlert.alertMsg
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
    const { handleSubmit } = this.props;
    const {
      errors: { subject, title, description, slug, other },
      isLoading
    } = this.state;

    return (
      <Container style={{ paddingTop: 20 }}>
        <Message
          header="Create a Ticket"
          content="Fill out the form below to create a ticket"
        />
        {subject || title || description || other || slug ? (
          <Message
            size="small"
            error
            header="Sign up error: "
            content={subject || title || description || slug || other}
          />
        ) : null}
        <Form
          className="attached fluid segment"
          onSubmit={handleSubmit(this.handleSubmitClick)}
        >
          <Field name="title" label="Title" component={this.renderField} />
          <Field name="subject" label="Subject" component={this.renderField} />

          <Field
            name="slug"
            label="Tags: e.g javascriprt, pyhton, django"
            component={this.renderField}
          />

          <Field
            name="description"
            label="Description"
            component={this.renderField}
          />
          <Field
            name="priority_level"
            label="Priority"
            component={this.RenderSelectInput}
          />
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
  console.log("Form values: ", values);
  const formErrors = {};
  if (!values.slug) {
    formErrors.slug = "Enter a slug";
  }
  if (!values.title) {
    formErrors.title = "Enter a title";
  }

  if (!values.description) {
    formErrors.description = "Enter a description";
  }
  if (!values.subject) {
    formErrors.subject = "Enter a subject";
  }
  if (!values.priority) {
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
