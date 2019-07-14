import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Button, Container, Menu } from "semantic-ui-react";

import LoginModal from "../userAuth/LoginModal";
import SignupModal from "../userAuth/SignupModal";
import { logOut } from "../../actions/index";

export class DesktopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      showSignupModal: false,
      fixed: false
    };

    this.renderNavButtons = this.renderNavButtons.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.showFixedMenu = this.showFixedMenu.bind(this);
    this.hideFixedMenu = this.hideFixedMenu.bind(this);
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
    window.location.reload();
  }

  renderNavButtons() {
    const { sessionToken } = this.props.userAuth;
    const { fixed } = this.state;

    if (sessionToken) {
      return (
        <Button
          inverted={!fixed}
          primary={fixed}
          style={{ marginLeft: "0.5em" }}
          onClick={this.handleLogoutClick}
        >
          Log out
        </Button>
      );
    } else {
      return (
        <Fragment>
          <Button inverted={!fixed} onClick={this.handleLoginClick}>
            Log in
          </Button>
          <Button
            inverted={!fixed}
            primary={fixed}
            style={{ marginLeft: "0.5em" }}
            onClick={this.handleSignupClick}
          >
            Sign Up
          </Button>
        </Fragment>
      );
    }
  }

  render() {
    const { showLoginModal, showSignupModal, fixed } = this.state;

    if (showLoginModal) {
      return <LoginModal />;
    }
    if (showSignupModal) {
      return <SignupModal />;
    }
    return (
      <div>
        <Menu
          fixed={fixed ? "top" : null}
          inverted={!fixed}
          pointing={!fixed}
          secondary={!fixed}
          size="large"
        >
          <Container>
            <Menu.Item active>
              <Link to="/"> Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/features"> Features</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/pricing"> Pricing</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/tickets"> Tickets</Link>
            </Menu.Item>
            <Menu.Item position="right">{this.renderNavButtons()}</Menu.Item>
          </Container>
        </Menu>
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
)(withRouter(DesktopNav));
