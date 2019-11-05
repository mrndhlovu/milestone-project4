import React, { Component, Fragment } from "react";
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
import UserImage from "../components/navigation/UserImage";
import Cart from "../components/navigation/Cart";

const styles = { paddingLeft: "31%", fontSize: "0.8rem" };

export class MobileSideBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      showSignupModal: false,
      sidebarOpened: false,
      image: ""
    };

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleSidebarHide = this.handleSidebarHide.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { user, userProfile } = this.props;
    if (prevProps.user.isAuthenticated !== user.isAuthenticated) {
      this.props.fetchPendingOrder();
    }

    if (prevProps.userProfile !== userProfile) {
      if (userProfile.dataReceived) {
        const { image } = userProfile.data.current_membership;
        this.setState({ image: image });
      }
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
    const { sidebarOpened, image } = this.state;
    const {
      user: { isAuthenticated },
      userProfile,
      pendingOrder
    } = this.props;

    return (
      <Fragment>
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
          <Segment inverted textAlign="center" vertical>
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
                <Menu.Item textAlign="right">
                  {isAuthenticated && userProfile.dataReceived && (
                    <UserImage
                      username={userProfile.data.username}
                      currentMembership={userProfile.data.current_membership}
                      image={image}
                    />
                  )}
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>

          {this.props.children}
        </Sidebar.Pusher>
      </Fragment>
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
