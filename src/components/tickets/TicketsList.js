import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  Container,
  Header,
  Label,
  List,
  Segment,
  Feed,
  Divider
} from "semantic-ui-react";

import { fetchTicketsList } from "../../actions/TicketActions";
import HeadingImage from "../home/HeadingImage";

export class TicketsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText: "Tickets",
      headerButtonUrl: "/create-ticket",
      headerButtonText: "Create a ticket",
      subHeading: "Head start on coding issues and save hours!"
    };
  }

  componentDidMount() {
    this.props.fetchTicketsList();
  }

  renderTicketsList() {
    const { ticketsList } = this.props;

    return ticketsList.map(ticket => {
      const { title, subject, id, created_at, slug } = ticket;

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
                <span style={{ paddingTop: 5 }}>
                  <Feed.Date>{wholeDate}</Feed.Date>
                </span>

                <Feed.Summary>
                  <a href="/">Laura Faucet </a>
                  created a ticket
                </Feed.Summary>
                <Feed.Extra text>{subject}</Feed.Extra>
              </Feed.Content>
              <div floated="right">
                <Label color="teal" as="a">
                  Votes: 22
                </Label>
              </div>
            </Feed.Event>
          </Feed>

          <Label.Group color="teal" size="tiny">
            <Label as="a">{slug}</Label>
          </Label.Group>
          <Divider />
        </Fragment>
      );
    });
  }

  render() {
    const {
      headerText,
      headerButtonUrl,
      headerButtonText,
      subHeading
    } = this.state;

    return (
      <Fragment>
        <HeadingImage
          data={{ headerText, headerButtonUrl, headerButtonText, subHeading }}
        />
        <Container>
          <Header
            content="All Tickets"
            subheader="Currently there are - - tickets "
            as="h4"
            style={{ paddingTop: 20 }}
          />
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
    isLoading: state.tickets,
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  { fetchTicketsList }
)(TicketsList);
