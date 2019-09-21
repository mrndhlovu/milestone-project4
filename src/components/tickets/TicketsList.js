import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Container, Header, List, Segment } from "semantic-ui-react";

import { fetchTicketsList } from "../../actions/TicketActions";
import HeadingImage from "../home/HeadingImage";
import { getTicketList } from "../../selectors/appSelectors";
import Tickets from "./Tickets";
import { getObjectLength } from "../../utils/appUtils";

export class TicketsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchTicketsList();
  }

  render() {
    const { ticketsList } = this.props;
    console.log(ticketsList);

    const ticketCount = getObjectLength(ticketsList);

    return (
      <Fragment>
        <HeadingImage />
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
    ticketsList: getTicketList(state).data,
    isLoading: state.tickets
  };
};

export default connect(
  mapStateToProps,
  { fetchTicketsList }
)(TicketsList);
