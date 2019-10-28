import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

import PageHeader from "../components/sharedComponents/PageHeader";
import { getTicketList } from "../selectors/appSelectors";
import { fetchTicketsList } from "../actions/TicketActions";
import DashboardCards from "../components/dashboard/DashboardCards";
import StyledMessage from "../components/sharedComponents/StyledMessage";
import { Segment } from "semantic-ui-react";
import DashboardPieChart from "../components/dashboard/DashboardBarChart";

export class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: "",
      series: ""
    };
  }

  componentDidMount() {
    this.props.fetchTicketsList();

    this.setState({
      options: {
        chart: {
          id: "basic-bar",
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
            endingShape: "arrow"
          }
        },
        stroke: {
          width: [4, 0, 0]
        },
        xaxis: {
          categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        markers: {
          size: 6,
          strokeWidth: 3,
          fillOpacity: 0,
          strokeOpacity: 0,
          hover: {
            size: 8
          }
        },
        yaxis: {
          tickAmount: 5,
          min: 0,
          max: 100
        }
      },
      series: [
        {
          name: "series-1",
          type: "line",
          data: [30, 40, 25, 50, 49, 21, 70, 51]
        },
        {
          name: "series-2",
          type: "column",
          data: [23, 12, 54, 61, 32, 56, 81, 19]
        },
        {
          name: "series-3",
          type: "column",
          data: [62, 12, 45, 55, 76, 41, 23, 43]
        }
      ]
    });
  }

  render() {
    const { tickets } = this.props;
    const { options, series } = this.state;

    return (
      tickets.data && (
        <Fragment>
          <PageHeader />
          <Segment padded>
            {tickets.data.length > 0 ? (
              <DashboardCards
                ticketList={tickets.data}
                chartData={{ options, series }}
              />
            ) : (
              <StyledMessage
                message="No tickets at this time."
                redirect="/create-ticket"
                linkText="Create a ticket"
              />
            )}
          </Segment>
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
