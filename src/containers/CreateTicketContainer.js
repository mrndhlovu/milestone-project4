import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";

import { Form, Message, Container } from "semantic-ui-react";

import { createTicket } from "../actions/TicketActions";
import {
  getErrors,
  getUser,
  getTicket,
  getUserProfile
} from "../selectors/appSelectors";
import { slugify, validate } from "../utils/appUtils";
import CreateTicketFormField from "../components/tickets/CreateTicketFormField";
import CreateTicketDropdown from "../components/tickets/CreateTicketDropdown";
import SubmitButton from "../components/sharedComponents/SubmitButton";
import CreateTicketRadioButtons from "../components/tickets/CreateTicketRadioButtons";
import MessageModal from "../components/sharedComponents/MessageModal";
import PageHeader from "../components/sharedComponents/PageHeader";

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
    const {
      handleSubmit,
      field,
      errorAlert,
      valid,
      pristine,
      user,
      history
    } = this.props;
    const { isLoading, isBug, isFeature, value } = this.state;
    const allAccess =
      user.dataReceived &&
      user.data.current_membership.membership.is_pro_member;

    return (
      <Fragment>
        <PageHeader pageId="open-ticket" />
        <Container style={{ paddingTop: 20 }}>
          <Message
            header="Create a Ticket"
            content="Fill out the form below to create a ticket"
            attached
          />
          {errorAlert.status !== "" && errorAlert.status ? (
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
            <Field
              name="subject"
              label="Subject"
              component={this.renderField}
            />
            <Field
              name="description"
              label="Description"
              component={this.renderField}
            />
            <CreateTicketDropdown field={field} />
            <div style={{ paddingTop: 10 }}>
              <SubmitButton
                allAccess={allAccess}
                pristine={pristine}
                valid={valid}
                isLoading={isLoading}
                onClick={() => this.setState({ isLoading: true })}
                buttonText="Submit"
              />
            </div>
          </Form>

          {!allAccess && (
            <MessageModal
              feature="file a ticket"
              history={history}
              redirect="pricing"
              showMessageModal={true}
              header="UPGRADE MEMBERSHIP"
            />
          )}
        </Container>
      </Fragment>
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

export default reduxForm({ validate, form: "CreateTicketForm" })(
  connect(mapStateToProps, { createTicket })(withRouter(CreateTicketContainer))
);
