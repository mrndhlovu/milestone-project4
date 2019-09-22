import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { fetchTicketsList } from "../actions/TicketActions";
import HeadingImage from "../components/home/HeadingImage";
import { getTicketList } from "../selectors/appSelectors";
import Tickets from "../components/tickets/Tickets";
import { getObjectLength } from "../utils/appUtils";
import TicketListWrapper from "../components/tickets/TicketListWrapper";
import StyledMessage from "../components/sharedComponents/StyledMessage";

import GridLayout from "./GridLayout";

export class TicketsListContainer extends Component {
  componentWillMount() {
    this.props.fetchTicketsList();
  }

  render() {
    const { ticketsList } = this.props;
    const ticketCount = getObjectLength(ticketsList.data);

    return (
      <Fragment>
        <HeadingImage />

        <GridLayout>
          <TicketListWrapper
            ticketCount={ticketCount}
            isLoading={ticketsList.isLoading}
          >
            {ticketsList.data.length > 0 ? (
              <Tickets ticketsList={ticketsList.data} />
            ) : (
              <StyledMessage
                message="No tickets at this time."
                redirect="/create-ticket"
                linkText="Create a ticket"
              />
            )}
          </TicketListWrapper>
        </GridLayout>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ticketsList: getTicketList(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchTicketsList }
)(TicketsListContainer);
