import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Container, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

import { logOut } from "../actions/AuthActions";
import {
  getUser,
  getUserProfile,
  getCartPendingOrder
} from "../selectors/appSelectors";
import { fetchPendingOrder } from "../actions/CheckoutActions";
import MobileNavigationLinks from "../components/navigation/MobileNavigationLinks";
import MobileSideBarButtons from "../components/navigation/MobileSideBarButtons";
import UserLabel from "../components/navigation/UserLabel";
import Cart from "../components/navigation/Cart";

const styles = { paddingLeft: "31%", fontSize: "0.8rem" };

export class MobileSideBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      showSignupModal: false,
      sidebarOpened: false
    };

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleSidebarHide = this.handleSidebarHide.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (prevProps.user.isAuthenticated !== user.isAuthenticated) {
      this.props.fetchPendingOrder();
    }
  }

  handleSidebarHide() {
    this.setState({ sidebarOpened: false });
  }

  handleToggle() {
    this.setState({ sidebarOpened: true });
  }

  handleLogoutClick() {
    this.props.logOut();
  }

  render() {
    const { sidebarOpened } = this.state;
    const {
      user: { isAuthenticated },
      userProfile,
      pendingOrder
    } = this.props;

    return (
      <div>
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <MobileNavigationLinks handleSidebarHide={this.handleSidebarHide} />
          <MobileSideBarButtons
            isAuthenticated={isAuthenticated}
            handleLogoutClick={this.handleLogoutClick}
          />
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>

                <Menu.Item style={styles}>
                  {pendingOrder.data.count > 0 && (
                    <Cart pendingOrders={pendingOrder.data} />
                  )}
                </Menu.Item>
                <Menu.Item>
                  {isAuthenticated && userProfile.dataReceived && (
                    <UserLabel
                      username={userProfile.data.username}
                      currentMembership={userProfile.data.current_membership}
                    />
                  )}
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>

          {this.props.children}
        </Sidebar.Pusher>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUser(state),
    userProfile: getUserProfile(state),
    pendingOrder: getCartPendingOrder(state)
  };
};

export default connect(
  mapStateToProps,
  { logOut, fetchPendingOrder }
)(withRouter(MobileSideBarContainer));
