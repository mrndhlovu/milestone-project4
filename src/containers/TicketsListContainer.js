import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Grid } from "semantic-ui-react";

import { fetchTicketsList } from "../actions/TicketActions";
import HeadingImage from "../components/home/HeadingImage";
import { getTicketList } from "../selectors/appSelectors";
import Tickets from "../components/tickets/Tickets";
import { getObjectLength } from "../utils/appUtils";
import TicketListWrapper from "../components/tickets/TicketListWrapper";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";

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
        {ticketsList.isLoading ? (
          <UILoadingSpinner />
        ) : (
          <Grid celled="internally">
            <Grid.Row>
              <Grid.Column width={2} />
              <Grid.Column width={12}>
                <TicketListWrapper ticketCount={ticketCount}>
                  <Tickets ticketsList={ticketsList.data} />
                </TicketListWrapper>
              </Grid.Column>
              <Grid.Column width={2} />
            </Grid.Row>
          </Grid>
        )}
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
