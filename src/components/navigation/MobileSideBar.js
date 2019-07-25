import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { logOut } from "../../actions/index";

import { Container, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

import LoginModal from "../userAuth/LoginModal";
import SignupModal from "../userAuth/SignupModal";

export class MobileSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      showSignupModal: false,
      sidebarOpened: false
    };

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSidebarHide = this.handleSidebarHide.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleSidebarHide() {
    this.setState({ sidebarOpened: false });
  }

  handleToggle() {
    this.setState({ sidebarOpened: true });
  }

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

    return sessionToken ? (
      <Menu.Item onClick={this.handleLogoutClick}>Log out</Menu.Item>
    ) : (
      <Fragment>
        <Menu.Item onClick={this.handleLoginClick}>Log in</Menu.Item>
        <Menu.Item onClick={this.handleSignupClick}>Sign Up</Menu.Item>
      </Fragment>
    );
  }

  render() {
    const { sidebarOpened, showLoginModal, showSignupModal } = this.state;
    const { children } = this.props;

    if (showLoginModal) {
      return <LoginModal />;
    }
    if (showSignupModal) {
      return <SignupModal />;
    }

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
          <Fragment>
            <Menu.Item
              onClick={this.handleSidebarHide}
              as={Link}
              name="home"
              to="/"
            >
              Home
            </Menu.Item>
          </Fragment>
          <Menu.Item
            onClick={this.handleSidebarHide}
            as={Link}
            name="products"
            to="/products"
          >
            Products
          </Menu.Item>
          <Menu.Item
            onClick={this.handleSidebarHide}
            as={Link}
            to="/pricing"
            name="pricing"
          >
            Pricing
          </Menu.Item>
          <Menu.Item
            onClick={this.handleSidebarHide}
            as={Link}
            to="/tickets"
            name="tickets"
          >
            Tickets
          </Menu.Item>
          {this.renderAuthButtons()}
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
                <Menu.Item position="right">{this.renderNavButtons}</Menu.Item>
              </Menu>
            </Container>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { userAuth: state.auth };
};

export default connect(
  mapStateToProps,
  { logOut }
)(withRouter(MobileSideBar));
