import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { requestTicketsDetail, updateTicket } from "../actions/TicketActions";
import EditTicketFields from "../components/sharedComponents/EditFields";
import { getTicketDetail, getTicketUpdate } from "../selectors/appSelectors";
import EditFormWrapper from "../components/sharedComponents/EditFormWrapper";

class EditTicketContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updating: false,
      editFields: ""
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.requestTicketsDetail(id);
  }

  componentDidUpdate(prevProps) {
    const { editTicket, ticket } = this.props;

    if (prevProps.ticket.data !== ticket.data) {
      this.setState({ editFields: ticket.data.data });
    }
    if (prevProps.editTicket.data !== editTicket.data) {
      const { id } = this.props.match.params;
      this.props.history.push(`/ticket/${id}`);
    }
  }

  handleFieldChange = (fieldName, event) => {
    const { editFields } = this.state;
    event.preventDefault();
    this.setState({
      editFields: {
        ...editFields,
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
    const {
      ticket,
      ticket: {
        data: { data }
      }
    } = this.props;

    return (
      ticket.dataReceived && (
        <EditFormWrapper
          headerText="Edit your ticket"
          handleSubmitClick={this.handleSubmitClick}
          updating={updating}
          fieldComponent={
            <EditTicketFields
              editOption={data}
              handleFieldChange={this.handleFieldChange}
            />
          }
        />
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    ticket: getTicketDetail(state),
    editTicket: getTicketUpdate(state)
  };
};

EditTicketContainer.propTypes = {
  ticket: PropTypes.object.isRequired,
  editTicket: PropTypes.object.isRequired,
  requestTicketsDetail: PropTypes.func.isRequired,
  updateTicket: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { requestTicketsDetail, updateTicket })(
  withRouter(EditTicketContainer)
);
