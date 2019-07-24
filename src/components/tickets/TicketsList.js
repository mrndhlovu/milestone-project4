import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  Container,
  Header,
  Label,
  List,
  Segment,
  Dimmer,
  Loader,
  Image,
  Feed,
  Divider
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
        subject,
        // description,
        id,
        created_at
      } = ticket;

      const date = new Date(created_at);
      const wholeDate =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2) +
        " " +
        ("0" + date.getHours()).slice(-2) +
        ":" +
        ("0" + date.getMinutes()).slice(-2);

      return (
        <Fragment key={id}>
          <Feed>
            <Feed.Event>
              <Feed.Content>
                <Header as={Link} to={`ticket/${id}`} size="small" color="blue">
                  {title.toUpperCase()}
                </Header>
                <br />
                <Feed.Date>{wholeDate}</Feed.Date>
                <Feed.Summary>
                  <a href="/">Laura Faucet </a>
                  created a ticket
                </Feed.Summary>
                <Feed.Extra text>{subject}</Feed.Extra>
              </Feed.Content>
            </Feed.Event>
          </Feed>

          <Label.Group color="orange" size="tiny">
            <Label as="a">JavaScript</Label>
            <Label as="a">Python</Label>
            <Label as="a">Django</Label>
          </Label.Group>

          <Divider />
        </Fragment>
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
            as="h3"
            content="All Tickets"
            subheader="Currently there are - - tickets "
            style={{ paddingTop: 20 }}
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
            <Container>
              <List divided relaxed>
                {this.renderTicketsList()}
              </List>
            </Container>
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
