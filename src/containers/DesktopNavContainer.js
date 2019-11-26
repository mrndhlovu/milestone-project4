import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
import UserImage from "../components/navigation/UserImage";
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
      userProfile
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
            <Menu.Item position="right" style={{ paddingBottom: 0 }}>
              {pendingOrder.data.count > 0 && (
                <Cart pendingOrders={pendingOrder.data} />
              )}
              {userProfile.dataReceived && (
                <UserImage image={data.current_membership.image} />
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

DesktopNavContainer.propTypes = {
  user: PropTypes.object.isRequired,
  userProfile: PropTypes.object.isRequired,
  pendingOrder: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { logOut, fetchPendingOrder })(
  DesktopNavContainer
);
