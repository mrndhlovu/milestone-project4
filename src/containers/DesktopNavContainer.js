import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Container, Menu } from "semantic-ui-react";

import { logOut } from "../actions/AuthActions";
import { fetchPendingOrder } from "../actions/CheckoutActions";

import {
  getUser,
  getUserProfile,
  getCartPendingOrder
} from "../selectors/appSelectors";
import NavigationButtons from "../components/navigation/NavigationButtons";
import NavigationLinks from "../components/navigation/NavigationLinks";
import UserLabel from "../components/navigation/UserLabel";
import Cart from "../components/navigation/Cart";

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
    if (prevProps.user.isAuthenticated !== this.props.user.isAuthenticated) {
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
    Object.keys(isActive).map(item => {
      return name === item
        ? this.setState({
            isActive: { ...isActive, [name]: true }
          })
        : this.setState({ isActive: { ...isActive, [item]: false } });
    });
  }

  render() {
    const { fixed, isActive } = this.state;
    const {
      user: { isAuthenticated },
      userProfile: { username, current_membership },
      pendingOrder
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
              {isAuthenticated && pendingOrder.data.orders && (
                <Cart pendingOrders={pendingOrder.data} />
              )}
              {username && (
                <UserLabel
                  username={username}
                  current_membership={current_membership}
                />
              )}
              <NavigationButtons
                isAuthenticated={isAuthenticated}
                handleLogout={this.handleLogoutClick}
                fixed={fixed}
              />
            </Menu.Item>
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
    pendingOrder: getCartPendingOrder(state)
  };
};

export default connect(
  mapStateToProps,
  { logOut, fetchPendingOrder }
)(withRouter(DesktopNavContainer));
