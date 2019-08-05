import React, { Component, Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import { Button, Container, Menu, Icon, Label } from "semantic-ui-react";

import { logOut } from "../../actions/AuthActions";

const StyledSpan = styled.span`
  color: green;
  padding-right: 0.5rem;
`;
const StyledCartSpan = styled.span``;

export class DesktopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixed: false,
      isActive: {
        features: false,
        tickets: false,
        pricing: false,
        home: false
      },
      itemCount: ""
    };

    this.renderNavButtons = this.renderNavButtons.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.showFixedMenu = this.showFixedMenu.bind(this);
    this.hideFixedMenu = this.hideFixedMenu.bind(this);
    this.renderUserLabel = this.renderUserLabel.bind(this);
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

  renderCart() {
    const { itemCount } = this.state;

    return (
      <Menu.Item>
        <StyledCartSpan>
          <Label as={NavLink} to="/cart" color="black">
            <Icon name="cart" />
            {itemCount}
          </Label>
        </StyledCartSpan>
      </Menu.Item>
    );
  }

  renderNavButtons() {
    const { isAuthenticated } = this.props.userAuth;
    const { fixed } = this.state;

    return isAuthenticated ? (
      <Button
        inverted={!fixed}
        primary={fixed}
        style={{ marginLeft: "0.5em" }}
        onClick={this.handleLogoutClick}
      >
        Log out
      </Button>
    ) : (
      <Fragment>
        <Button inverted={!fixed} as={NavLink} to="/login">
          Log in
        </Button>
        <Button
          inverted={!fixed}
          primary={fixed}
          style={{ marginLeft: "0.5em" }}
          as={NavLink}
          to="/signup"
        >
          Sign Up
        </Button>
      </Fragment>
    );
  }

  renderUserLabel() {
    const { username } = this.props.user;

    return username ? (
      <StyledSpan>
        <Icon name="user" size="small" />
        {username}
      </StyledSpan>
    ) : null;
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
            <Menu.Item
              active={isActive.home === true ? true : false}
              as={NavLink}
              to=""
              onClick={this.showActiveLink.bind(this, "home")}
            >
              Home
            </Menu.Item>
            <Menu.Item
              active={isActive.features ? true : false}
              to="/products"
              as={NavLink}
              onClick={this.showActiveLink.bind(this, "products")}
            >
              Products
            </Menu.Item>
            <Menu.Item
              active={isActive.pricing ? true : false}
              as={NavLink}
              to="/pricing"
              onClick={this.showActiveLink.bind(this, "pricing")}
            >
              Pricing
            </Menu.Item>
            <Menu.Item
              active={isActive.tickets ? true : false}
              as={NavLink}
              to="/tickets"
              onClick={this.showActiveLink.bind(this, "tickets")}
            >
              Tickets
            </Menu.Item>

            <Menu.Item position="right">
              {this.renderCart()}
              {this.renderUserLabel()}
              {this.renderNavButtons()}
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userAuth: state.auth,
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  { logOut }
)(withRouter(DesktopNav));
