"use es6";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchTickets } from "../actions/index";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Card";

export class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketList: "",
      toggleCollapsed: false
    };

    this.renderTicketsList = this.renderTicketsList.bind(this);
  }

  componentDidMount() {
    this.props.fetchTickets();
    // if (this.props.tickets.requestSuccess === true) {
    //   this.setState({
    //     ticketList: this.props.tickets
    //   });
    // }
  }

  renderTicketsList() {
    const { tickets } = this.props;
    return tickets.map(ticket => {
      const { title, ticket_id, description } = ticket;
      return (
        <Card key={ticket_id}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {title}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{description}</Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    });
  }

  render() {
    return (
      <Fragment>
        <Accordion defaultActiveKey={this.state.toggleCollapsed}>
          <h1>Tickets List</h1>
          {this.renderTicketsList()}
        </Accordion>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    tickets: state.tickets.ticketsList
  };
};

export default connect(
  mapStateToProps,
  { fetchTickets }
)(Tickets);
