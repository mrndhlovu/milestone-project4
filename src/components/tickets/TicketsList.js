import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import {
  Container,
  Header,
  Label,
  List,
  Segment,
  Feed,
  Divider,
  Icon
} from "semantic-ui-react";

import { fetchTicketsList } from "../../actions/TicketActions";
import HeadingImage from "../home/HeadingImage";
import { getFormatedDate } from "../../constants/constants";

const StyledTimeSpan = styled.span`
  font-size: 0.8rem;
`;

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
      const {
        title,
        subject,
        id,
        created_at,
        slug,
        views,
        votes,
        username
      } = ticket;

      return (
        <Fragment key={id}>
          <Feed>
            <Feed.Event>
              <Feed.Content>
                <Header as={Link} to={`ticket/${id}`} size="small" color="blue">
                  {title.toUpperCase()}
                </Header>
                <Feed.Summary>
                  By:
                  <span> @{username.toLowerCase()} </span>
                </Feed.Summary>
                <Feed.Date style={{ paddingTop: 10 }}>
                  <StyledTimeSpan>{getFormatedDate(created_at)}</StyledTimeSpan>
                </Feed.Date>
                <Feed.Extra text>{subject}</Feed.Extra>
              </Feed.Content>
              <div floated="right">
                <Label color="teal" as="a">
                  <Icon name="user" color="black" />
                  Votes:{votes}
                </Label>
                <Label color="teal" as="a">
                  <Icon name="eye" color="black" />
                  Views:{views}
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
    const { ticketsList } = this.props;

    const ticketCount =
      ticketsList !== "" ? Object.keys(ticketsList).length : 0;

    return (
      <Fragment>
        <HeadingImage
          data={{ headerText, headerButtonUrl, headerButtonText, subHeading }}
        />
        <Container>
          <Header
            content="Tickets List"
            subheader={`Ticket count:  ${ticketCount}`}
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
