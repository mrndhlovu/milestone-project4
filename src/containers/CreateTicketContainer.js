import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withRouter, Redirect } from "react-router-dom";

import { Form, Message, Container } from "semantic-ui-react";

import { createTicket } from "../actions/TicketActions";
import {
  getErrors,
  getUser,
  getTicket,
  getUserProfile
} from "../selectors/appSelectors";
import { slugify } from "../utils/appUtils";
import CreateTicketFormField from "../components/tickets/CreateTicketFormField";
import CreateTicketDropdown from "../components/tickets/CreateTicketDropdown";
import SubmitButton from "../components/sharedComponents/SubmitButton";
import CreateTicketRadioButtons from "../components/tickets/CreateTicketRadioButtons";
import GridLayout from "./GridLayout";

export class CreateTicketContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isFeature: false,
      isBug: true,
      isProMember: false
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { ticket, user } = this.props;

    if (prevProps.ticket !== ticket) {
      ticket.data.id !== undefined &&
        this.props.history.push(`/ticket/${ticket.data.id}`);
    }

    if (prevProps.user !== user) {
      if (user.data && user.dataReceived) {
        const { is_pro_member } = user.data.current_membership.membership;
        this.setState({ isProMember: is_pro_member });
      }
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
    const { isLoading, isBug, isFeature, value, isProMember } = this.state;

    if (!isProMember) {
      return <Redirect to="/login" />;
    }

    return (
      <Container style={{ paddingTop: 20 }}>
        <Message
          header="Create a Ticket"
          content="Fill out the form below to create a ticket"
          attached
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
          <CreateTicketRadioButtons
            value={value}
            handleChange={this.handleChange}
            isBug={isBug}
            isFeature={isFeature}
          />
          <Field name="title" label="Title" component={this.renderField} />
          <Field name="subject" label="Subject" component={this.renderField} />
          <Field
            name="description"
            label="Description"
            component={this.renderField}
          />
          <CreateTicketDropdown field={field} />
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
    auth: getUser(state),
    ticket: getTicket(state),
    user: getUserProfile(state)
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
