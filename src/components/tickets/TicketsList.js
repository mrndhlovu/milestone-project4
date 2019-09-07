import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Container, Header, List, Segment } from "semantic-ui-react";

import { fetchTicketsList } from "../../actions/TicketActions";
import HeadingImage from "../home/HeadingImage";
import { getTicketList } from "../../selectors/appSelectors";
import Tickets from "./Tickets";

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
                <Tickets ticketsList={ticketsList} />
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
    ticketsList: getTicketList(state).ticketsList,
    isLoading: state.tickets
  };
};

export default connect(
  mapStateToProps,
  { fetchTicketsList }
)(TicketsList);
