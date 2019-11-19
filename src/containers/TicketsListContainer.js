import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { fetchTicketsList } from "../actions/TicketActions";
import { addItemToCart, fetchPendingOrder } from "../actions/CheckoutActions";
import PageHeader from "../components/sharedComponents/PageHeader";
import {
  getTicketList,
  getCartAddOrRemove,
  getUserProfile,
  getUser
} from "../selectors/appSelectors";
import TicketsList from "../components/tickets/TicketsList";
import { Grid, Container } from "semantic-ui-react";
import { APP_TYPE } from "../constants/constants";
import ListSideBar from "../components/tickets/ListSideBar";
import { getPageId } from "../utils/urls";

const SytledContainer = styled(Container)`
  padding: 20px 5px;
  background-color: #eee;
`;

export class TicketsListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: "Add to cart"
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    this.props.fetchTicketsList();
  }

  handleAddToCart(id) {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.props.addItemToCart(id, APP_TYPE.ticket);
    } else {
      this.setState({ buttonText: "Login to Add to cart" });
    }
  }

  render() {
    const { ticketsList, user } = this.props;
    const { buttonText } = this.state;

    return (
      ticketsList.dataReceived && (
        <Fragment>
          <PageHeader pageId={getPageId()} dataTestId="tickets-page-header" />
          <SytledContainer fluid>
            <Grid stackable columns={2}>
              <Grid.Column width={4}>
                <ListSideBar data={ticketsList.data} />
              </Grid.Column>

              <Grid.Column width={12}>
                <TicketsList
                  tickets={ticketsList.data}
                  isLoading={ticketsList.isLoading}
                  buttonText={buttonText}
                  user={user}
                  handleAddToCart={this.handleAddToCart}
                />
              </Grid.Column>
            </Grid>
          </SytledContainer>
        </Fragment>
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    ticketsList: getTicketList(state),
    ticketsCart: getCartAddOrRemove(state),
    user: getUserProfile(state),
    auth: getUser(state)
  };
};

export default connect(mapStateToProps, {
  fetchTicketsList,
  addItemToCart,
  fetchPendingOrder
})(TicketsListContainer);
