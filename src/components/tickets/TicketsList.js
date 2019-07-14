import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Container, Table, Button } from "semantic-ui-react";

import { fetchTicketsList } from "../../actions/index";

export class TicketsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false
    };
  }

  componentDidMount() {
    this.props.fetchTicketsList();
  }

  renderTableRow() {
    const { ticketsList } = this.props;

    return ticketsList.map(ticket => {
      const { prority_level, title, status, subject, description, id } = ticket;
      return (
        <Table.Row disabled key={id}>
          <Table.Cell>{title}</Table.Cell>
          <Table.Cell>{subject}</Table.Cell>
          <Table.Cell>{description}</Table.Cell>
          <Table.Cell>{status}</Table.Cell>
          <Table.Cell textAlign="center">{prority_level}</Table.Cell>
          <Table.Cell>
            <Link to={`ticket/${id}`}>
              <Button positive>Read More</Button>
            </Link>
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return (
      <Container text>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Subject</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Priority Level</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.renderTableRow()}</Table.Body>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log("Tickets state: ", state);
  return {
    ticketsList: state.tickets.ticketsList
  };
};

export default connect(
  mapStateToProps,
  { fetchTicketsList }
)(TicketsList);
