import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import PageHeader from "../components/sharedComponents/PageHeader";
import { getTicketList } from "../selectors/appSelectors";
import { fetchTicketsList } from "../actions/TicketActions";
import DashboardCards from "../components/dashboard/DashboardCards";
import StyledMessage from "../components/sharedComponents/StyledMessage";
import { Segment } from "semantic-ui-react";
import { getPageId } from "../utils/urls";

const StyledContainer = styled(Segment)`
  background-color: #eee !important;
  margin: 0 auto !important;
`;

export class DashboardContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTicketsList();
  }

  render() {
    const { tickets } = this.props;

    return (
      tickets.data && (
        <Fragment>
          <PageHeader pageId={getPageId()} />
          <StyledContainer>
            {tickets.data.length > 0 ? (
              <DashboardCards ticketList={tickets.data} />
            ) : (
              <StyledMessage
                message="No tickets at this time."
                redirect="/create-ticket"
                linkText="Create a ticket"
              />
            )}
          </StyledContainer>
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

export default connect(mapStateToProps, { fetchTicketsList })(
  DashboardContainer
);
