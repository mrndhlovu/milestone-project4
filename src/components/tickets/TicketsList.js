import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  Container,
  Header,
  List,
  Segment,
  Dimmer,
  Loader,
  Image
} from "semantic-ui-react";

import CreateTicket from "./CreateTicket";
import { fetchTicketsList } from "../../actions/index";
import HeadingImage from "../home/HeadingImage";

export class TicketsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText: "Tickets",
      headerButtonUrl: "/create-ticket",
      headerButtonText: "Create a ticket"
    };
  }

  componentDidMount() {
    this.props.fetchTicketsList();
  }

  renderTicketsList() {
    const { ticketsList } = this.props;

    return ticketsList.map(ticket => {
      const {
        // prority_level,
        title,
        // status,
        // subject,
        // description,
        id,
        created_at
      } = ticket;
      return (
        <List.Item key={id}>
          <List.Icon name="file" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header as={Link} to={`ticket/${id}`}>
              {title}
            </List.Header>
            <List.Description as="a">{created_at}</List.Description>
          </List.Content>
        </List.Item>
      );
    });
  }

  render() {
    const { isLoading, dataReceived } = this.props.isLoading;
    const { sessionToken } = this.props.authUser;
    const { headerText, headerButtonUrl, headerButtonText } = this.state;

    return isLoading && !dataReceived ? (
      <Fragment>
        <Dimmer active inverted>
          <Loader size="mini">Loading</Loader>
        </Dimmer>
        <Image src="/images/wireframe/short-paragraph.png" />
      </Fragment>
    ) : (
      <Fragment>
        <HeadingImage
          data={{ headerText, headerButtonUrl, headerButtonText }}
        />
        <Container>
          <Header
            as="h2"
            content="Tickets"
            subheader="View or create a ticket here"
          />
          {sessionToken ? (
            <Header as="h4" attached="top" block>
              <CreateTicket />
            </Header>
          ) : null}

          <Header as="h4" attached="top" block>
            Tickets List
          </Header>
          <Segment attached>
            <List divided relaxed>
              {this.renderTicketsList()}
            </List>
          </Segment>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ticketsList: state.tickets.ticketsList,
    authUser: state.auth,
    isLoading: state.tickets
  };
};

export default connect(
  mapStateToProps,
  { fetchTicketsList }
)(TicketsList);
