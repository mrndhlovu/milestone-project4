import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withRouter, Redirect } from "react-router-dom";

import { Form, Message, Container } from "semantic-ui-react";

import { createTicket } from "../actions/TicketActions";
import { getErrors, getUser, getTicket } from "../selectors/appSelectors";
import { hasProMembership, slugify } from "../utils/appUtils";
import CreateTicketFormField from "../components/tickets/CreateTicketFormField";
import CreateTicketDropdown from "../components/tickets/CreateTicketDropdown";
import SubmitButton from "../components/sharedComponents/SubmitButton";
import CreateTicketRadioButtons from "../components/tickets/CreateTicketRadioButtons";

export class CreateTicketContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isFeature: false,
      isBug: true
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { ticket } = this.props;

    if (prevProps.ticket !== ticket) {
      ticket.data.id !== undefined &&
        this.props.history.push(`/ticket/${ticket.data.id}`);
    }
  }

  renderField(field) {
    return <CreateTicketFormField field={field} />;
  }

  handleChange() {
    const { isBug, isFeature } = this.state;
    this.setState({ isBug: !isBug, isFeature: !isFeature });
  }

  handleSubmitClick(values) {
    const { isBug, isFeature } = this.state;
    const { subject } = values;
    const tag = slugify(subject);
    const ticketType = {
      is_bug: isBug,
      is_feature: isFeature
    };
    const updatedValues = { ...values, tag, ...ticketType };

    this.props.createTicket(updatedValues);
  }

  render() {
    const { handleSubmit, field, errorAlert, valid, pristine } = this.props;
    const { isLoading, isBug, isFeature, value } = this.state;

    if (!hasProMembership()) {
      return <Redirect to="/login" />;
    }

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
          <CreateTicketDropdown field={field} />

          <CreateTicketRadioButtons
            value={value}
            handleChange={this.handleChange}
            isBug={isBug}
            isFeature={isFeature}
          />

          <div style={{ paddingTop: 10 }}>
            <SubmitButton
              pristine={pristine}
              valid={valid}
              isLoading={isLoading}
              onClick={() => this.setState({ isLoading: true })}
              buttonText="Submit"
            />
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
  )(withRouter(CreateTicketContainer))
);