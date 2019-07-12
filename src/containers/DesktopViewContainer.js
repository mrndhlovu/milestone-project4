import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
// import { connect } from "react-redux";

import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility
} from "semantic-ui-react";

import HomepageHeading from "../components/HomepageHeading";
import LoginModal from "../components/userAuth/LoginModal";
import SignupModal from "../components/userAuth/SignupModal";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopViewContainer extends Component {
  state = {
    showLoginModal: false,
    showSignupModal: false
  };
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });
  handleSignupClick = () => this.setState({ showSignupModal: true });
  handleLoginClick = () => this.setState({ showLoginModal: true });

  render() {
    const { children } = this.props;

    const { fixed } = this.state;

    const { showLoginModal, showSignupModal } = this.state;
    if (showLoginModal) {
      return <LoginModal />;
    }
    if (showSignupModal) {
      return <SignupModal />;
    }

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a" active>
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
                <Menu.Item position="right">
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
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopViewContainer.propTypes = {
  children: PropTypes.node
};

export default withRouter(DesktopViewContainer);
