import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { fetchTicketsList, updatedTicketVote } from "../actions/TicketActions";
import { addItemToCart, fetchPendingOrder } from "../actions/CheckoutActions";
import PageHeader from "../components/sharedComponents/PageHeader";
import {
  getTicketList,
  getCartAddOrRemove,
  getUserProfile,
  getUser
} from "../selectors/appSelectors";
import Tickets from "../components/tickets/Tickets";
import { getObjectLength } from "../utils/appUtils";
import TicketsList from "../components/tickets/TicketsList";
import StyledMessage from "../components/sharedComponents/StyledMessage";
import { Container } from "semantic-ui-react";
import { APP_TYPE } from "../constants/constants";

export class TicketsListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: "",
      buttonText: "Add to cart"
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    const { ticketsList } = this.props;
    this.props.fetchTicketsList();
    if (ticketsList.dataReceived) {
      this.setState({ tickets: ticketsList.data });
    }
  }

  handleVote(id) {
    const { user } = this.props;
    const allAccess =
      user.dataReceived &&
      user.data.current_membership.membership.is_pro_member;

    if (allAccess) {
      this.props.updatedTicketVote(id);
    }
  }

  handleAddToCart(id) {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.props.addItemToCart(id, APP_TYPE.ticket);
    } else {
      this.setState({ buttonText: "Login to Add to cart" });
    }
  }

  componentDidUpdate(prevProps) {
    const { ticketsList } = this.props;

    if (prevProps.ticketsList !== ticketsList) {
      if (ticketsList.dataReceived) {
        this.setState({ tickets: ticketsList.data });
      }
    }
  }

  render() {
    const { ticketsList, user } = this.props;
    const { tickets, buttonText } = this.state;
    const ticketCount = getObjectLength(tickets);

    return (
      <Fragment>
        <PageHeader />
        <Container style={{ paddingTop: 20 }}>
          <TicketsList
            ticketCount={ticketCount}
            isLoading={tickets.isLoading}
            component={
              ticketsList.data.length > 0 && ticketsList.dataReceived ? (
                <Tickets
                  handleAddToCart={this.handleAddToCart}
                  handleVote={this.handleVote}
                  ticketsList={tickets}
                  user={user}
                  buttonText={buttonText}
                />
              ) : (
                <StyledMessage
                  message="No tickets at this time."
                  redirect="/create-ticket"
                  linkText="Create a ticket"
                />
              )
            }
          />
        </Container>
      </Fragment>
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

export default connect(
  mapStateToProps,
  { fetchTicketsList, addItemToCart, fetchPendingOrder, updatedTicketVote }
)(TicketsListContainer);
