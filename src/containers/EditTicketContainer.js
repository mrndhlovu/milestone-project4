import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Button, Form, Message, Container, Segment } from "semantic-ui-react";

import { requestTicketsDetail, updateTicket } from "../actions/TicketActions";
import EditTicketFields from "../components/tickets/EditTicketFields";
import { getTicketDetail, getTicketUpdate } from "../selectors/appSelectors";

class EditTicketContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updating: false,
      editFields: ""
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.requestTicketsDetail(id);
  }

  componentDidUpdate(prevProps) {
    const { editTicket, ticket } = this.props;

    if (prevProps.ticket.data !== ticket.data) {
      this.setState({ editFields: ticket.data });
    }
    if (prevProps.editTicket.data !== editTicket.data) {
      const { id } = this.props.match.params;
      this.props.history.push(`/ticket/${id}`);
    }
  }

  handleFieldChange = (fieldName, event) => {
    event.preventDefault();
    this.setState({
      editFields: {
        ...this.state.editFields,
        [fieldName]: event.target.value
      }
    });
  };

  handleSubmitClick() {
    this.setState({ updating: true });

    const ticketId = parseInt(this.props.match.params.id);
    const { editFields } = this.state;
    const filteredKeys = ["title", "description", "subject"];
    let updatedValues;

    Object.keys(editFields).forEach(key => {
      if (!filteredKeys.includes(key)) {
        delete editFields[key];
        updatedValues = editFields;
      }
    });

    this.props.updateTicket(ticketId, updatedValues);
  }

  render() {
    const { updating } = this.state;
    const { ticket } = this.props;

    return (
      <Container style={{ paddingTop: 20 }}>
        <Message
          header="Edit your Ticket"
          content="Fill out the form below to create a ticket"
        />
        <Segment>
          <Form>
            <EditTicketFields
              ticket={ticket.data}
              handleFieldChange={this.handleFieldChange}
            />
            <Button
              loading={updating}
              size="small"
              color="blue"
              type="submit"
              onClick={this.handleSubmitClick}
            >
              Submit
            </Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    ticket: getTicketDetail(state),
    editTicket: getTicketUpdate(state)
  };
};

export default connect(
  mapStateToProps,
  { requestTicketsDetail, updateTicket }
)(withRouter(EditTicketContainer));
