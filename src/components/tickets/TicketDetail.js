import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { requestTicketsDetail } from "../../actions/index";

import {
  Container,
  Header,
  Segment,
  Dimmer,
  Loader,
  Image,
  Divider,
  Icon,
  Button
} from "semantic-ui-react";

export class TicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.requestTicketsDetail(this.props.match.params.id);
  }

  render() {
    const {
      dataReceived,
      isLoading,
      ticket: { title, created_at, description }
    } = this.props.ticket;

    const date = new Date(created_at);
    const wholeDate =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      "  / " +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2);

    return isLoading && !dataReceived ? (
      <div>
        <Dimmer active inverted>
          <Loader size="mini">Loading</Loader>
        </Dimmer>
        <Image src="/images/wireframe/short-paragraph.png" />
      </div>
    ) : (
      <Container style={{ paddingTop: 20 }}>
        <div style={{ paddingTop: 10 }}>
          <Button
            color="blue"
            size="tiny"
            floated="right"
            as={NavLink}
            to="/create-ticket"
          >
            Create a ticket
          </Button>
        </div>
        <Header
          as="h3"
          color="blue"
          content={title}
          subheader={`Ticket filed: ${wholeDate}`}
        />

        <Divider />

        <Header as="h4" attached="top" block>
          <Segment>
            <Header as="h2" content="Description" />
            {description}
          </Segment>
        </Header>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    ticket: state.ticketDetail,
    authUser: state.auth
  };
};

export default connect(
  mapStateToProps,
  { requestTicketsDetail }
)(TicketDetail);
