import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { Container, Menu } from "semantic-ui-react";

import { logOut } from "../actions/AuthActions";
import { fetchPendingOrder } from "../actions/CheckoutActions";

import {
  getUser,
  getUserProfile,
  getCartPendingOrder,
  getUserMembership
} from "../selectors/appSelectors";
import NavigationButtons from "../components/navigation/NavigationButtons";
import NavigationLinks from "../components/navigation/NavigationLinks";
import NavigationCTAs from "../components/navigation/NavigationCTAs";

export class DesktopNavContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixed: false,
      isActive: {
        products: false,
        blog: false,
        tickets: false,
        pricing: false,
        home: false
      },
      itemCount: ""
    };

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.showFixedMenu = this.showFixedMenu.bind(this);
    this.hideFixedMenu = this.hideFixedMenu.bind(this);
    this.showActiveLink = this.showActiveLink.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (prevProps.user.isAuthenticated !== user.isAuthenticated) {
      this.props.fetchPendingOrder();
    }
  }

  hideFixedMenu() {
    this.setState({ fixed: false });
  }
  showFixedMenu() {
    this.setState({ fixed: true });
  }
  handleSignupClick() {
    this.setState({ showSignupModal: true });
  }
  handleLoginClick() {
    this.setState({ showLoginModal: true });
  }

  handleLogoutClick() {
    this.props.logOut();
  }

  showActiveLink(name) {
    const { isActive } = this.state;
    Object.keys(isActive).map(key => {
      if (name === key) {
        return this.setState({
          isActive: { ...isActive, [name]: true }
        });
      } else {
        return this.setState({ isActive: { ...isActive, [key]: false } });
      }
    });
  }

  render() {
    const { fixed, isActive } = this.state;
    const {
      user: { isAuthenticated },
      userProfile: { data },
      pendingOrder,
      userProfile,
      allAccess,
      history
    } = this.props;

    return (
      <div>
        <Menu
          fixed={fixed ? "top" : null}
          inverted={!fixed}
          pointing={!fixed}
          secondary={!fixed}
          size="small"
        >
          <Container>
            <NavigationLinks
              isActive={isActive}
              showActiveLink={this.showActiveLink}
            />
            <Menu.Item position="right">
              <NavigationButtons
                isAuthenticated={isAuthenticated}
                handleLogout={this.handleLogoutClick}
                fixed={fixed}
                allAccess={allAccess}
              />
            </Menu.Item>
            {userProfile.dataReceived && (
              <NavigationCTAs
                image={data.current_membership.image}
                allAccess={allAccess}
                username={data.username}
                history={history}
                pendingOrders={pendingOrder.data.count}
              />
            )}
          </Container>
        </Menu>
      </div>
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

DesktopNavContainer.propTypes = {
  user: PropTypes.object.isRequired,
  userProfile: PropTypes.object.isRequired,
  pendingOrder: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { logOut, fetchPendingOrder })(
  withRouter(DesktopNavContainer)
);
