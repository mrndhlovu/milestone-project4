import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

import HeadingImage from "../components/home/HeadingImage";
import GridLayout from "./GridLayout";
import { getTicketList } from "../selectors/appSelectors";
import { fetchTicketsList } from "../actions/TicketActions";
import DashboardCards from "../components/dashboard/DashboardCards";
import StyledMessage from "../components/sharedComponents/StyledMessage";

export class DashboardContainer extends Component {
  componentDidMount() {
    this.props.fetchTicketsList();
  }

  render() {
    const { tickets } = this.props;
    return (
      tickets.data && (
        <Fragment>
          <HeadingImage />
          <GridLayout>
            {tickets.data.length > 0 ? (
              <DashboardCards ticketList={tickets.data} />
            ) : (
              <StyledMessage
                message="No tickets at this time."
                redirect="/create-ticket"
                linkText="Create a ticket"
              />
            )}
          </GridLayout>
        </Fragment>
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    tickets: getTicketList(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchTicketsList }
)(DashboardContainer);
