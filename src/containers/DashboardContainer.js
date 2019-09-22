import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

import HeadingImage from "../components/home/HeadingImage";
import GridLayout from "./GridLayout";
import { getTicketList } from "../selectors/appSelectors";
import { fetchTicketsList } from "../actions/TicketActions";
import DashboardCards from "../components/dashboard/DashboardCards";

export class DashboardContainer extends Component {
  componentWillMount() {
    this.props.fetchTicketsList();
  }

  render() {
    const { tickets } = this.props;
    return (
      tickets.data && (
        <Fragment>
          <HeadingImage />
          <GridLayout>
            <DashboardCards ticketList={tickets.data} />
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
