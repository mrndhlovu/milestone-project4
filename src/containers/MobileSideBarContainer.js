import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { Container, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

import { logOut } from "../actions/AuthActions";
import {
  getUser,
  getUserProfile,
  getCartPendingOrder,
  getUserMembership
} from "../selectors/appSelectors";
import { fetchPendingOrder } from "../actions/CheckoutActions";
import MobileNavigationLinks from "../components/navigation/MobileNavigationLinks";
import MobileSideBarButtons from "../components/navigation/MobileSideBarButtons";
import NavigationCTAs from "../components/navigation/NavigationCTAs";

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
      pendingOrder,
      allAccess,
      history
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
          <Segment inverted vertical>
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item>
                  {isAuthenticated && userProfile.dataReceived && (
                    <NavigationCTAs
                      username={userProfile.data.username}
                      allAccess={allAccess}
                      image={image}
                      mobile={true}
                      history={history}
                      pendingOrders={pendingOrder.data.count}
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
    pendingOrder: getCartPendingOrder(state),
    allAccess: getUserMembership(state).is_pro_member
  };
};

MobileSideBarContainer.propTypes = {
  user: PropTypes.object.isRequired,
  userProfile: PropTypes.object.isRequired,
  pendingOrder: PropTypes.object.isRequired,
  fetchPendingOrder: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { logOut, fetchPendingOrder })(
  withRouter(MobileSideBarContainer)
);
