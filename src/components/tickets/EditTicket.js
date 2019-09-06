import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  Button,
  Form,
  Message,
  Container,
  Segment,
  Input,
  TextArea
} from "semantic-ui-react";

import {
  requestTicketsDetail,
  updateTicket
} from "../../actions/TicketActions";

const editField = ["description", "title", "subject", "priority_level"];

export class EditTicket extends Component {
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

  handleFieldChange = (fieldName, event) => {
    event.preventDefault();
    this.setState({
      editFields: {
        ...this.state.editFields,
        [fieldName]: event.target.value
      }
    });
  };

  renderFields() {
    const { ticket } = this.props.editTicket;

    return Object.keys(ticket).map((key, index) => {
      return (
        editField.includes(key) && (
          <Fragment key={index}>
            {key !== "description" ? (
              <Form.Field
                id={key}
                control={Input}
                label={key.toUpperCase()}
                defaultValue={ticket[key]}
                onChange={event => this.handleFieldChange(key, event)}
              />
            ) : (
              <Form.Field
                id={key}
                control={TextArea}
                label={key.toUpperCase()}
                defaultValue={ticket[key]}
                onChange={event => this.handleFieldChange(key, event)}
              />
            )}
          </Fragment>
        )
      );
    });
  }

  handleSubmitClick() {
    const ticketId = parseInt(this.props.match.params.id);
    const { editFields } = this.state;

    this.setState({ updating: true });

    const updatedValues = { ...editFields };

    this.props.updateTicket(ticketId, updatedValues);
  }

  componentDidUpdate(prevProps) {
    const { ticketUpdate } = this.props;
    if (prevProps.ticketUpdate !== ticketUpdate) {
      const { ticketUpdated, isLoading } = ticketUpdate;

      if (ticketUpdated && !isLoading) {
        this.setState({ updating: false });
      }
    }

    if (ticketUpdate.ticketUpdated) {
      const { id } = this.props.ticketUpdate.ticket;
      this.props.history.push(`/ticket/${id}`);
    }
  }

  render() {
    const { updating } = this.state;

    return (
      <Container style={{ paddingTop: 20 }}>
        <Message
          header="Edit your Ticket"
          content="Fill out the form below to create a ticket"
        />
        <Segment>
          <Form>
            {this.renderFields()}

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
    editTicket: state.ticketDetail,
    ticketUpdate: state.ticketUpdate
  };
};

export default connect(
  mapStateToProps,
  { requestTicketsDetail, updateTicket }
)(withRouter(EditTicket));
