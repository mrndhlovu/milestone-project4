// import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import LoginModal from "../components/userAuth/LoginModal";
import SignupModal from "../components/userAuth/SignupModal";
import { logOut } from "../actions/index";

import {
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar
} from "semantic-ui-react";

import HomepageHeading from "../components//home/HomepageHeading";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class MobileViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      showSignupModal: false
    };

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }
  handleSidebarHide = () => this.setState({ sidebarOpened: false });
  handleToggle = () => this.setState({ sidebarOpened: true });

  handleSignupClick() {
    this.setState({ showSignupModal: true });
  }
  handleLoginClick() {
    this.setState({ showLoginModal: true });
  }

  handleLogoutClick() {
    this.props.logOut();
    window.location.reload();
  }

  renderAuthButtons() {
    const { sessionToken } = this.props.userAuth;

    if (sessionToken) {
      return (
        <Menu.Item inverted onClick={this.handleLogoutClick}>
          Log out
        </Menu.Item>
      );
    } else {
      return (
        <Fragment>
          <Menu.Item inverted onClick={this.handleLoginClick}>
            Log in
          </Menu.Item>
          <Menu.Item inverted onClick={this.handleSignupClick}>
            Sign Up
          </Menu.Item>
        </Fragment>
      );
    }
  }

  render() {
    const { children } = this.props;

    const { showLoginModal, showSignupModal, sidebarOpened } = this.state;

    if (showLoginModal) {
      return <LoginModal />;
    }
    if (showSignupModal) {
      return <SignupModal />;
    }

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item>
            <Link to="/"> Home</Link>
          </Menu.Item>
          <Menu.Item as="a">
            <Link to="/features"> Features</Link>
          </Menu.Item>
          <Menu.Item as="a">
            <Link to="/pricing"> Pricing</Link>
          </Menu.Item>
          <Menu.Item as="a">
            <Link to="/tickets"> Tickets</Link>
          </Menu.Item>
          {this.renderAuthButtons()}
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">{this.renderNavButtons}</Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

const mapStateToProps = state => {
  return { userAuth: state.auth };
};

// MobileViewContainer.propTypes = {
//   children: PropTypes.node
// };

export default connect(
  mapStateToProps,
  { logOut }
)(withRouter(MobileViewContainer));
