import React, { Component, Fragment } from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import { Button, Container, Menu, Icon, Label } from "semantic-ui-react";

import { logOut } from "../../actions/AuthActions";
import { navLinkText } from "../../constants/constants";

const StyledSpan = styled.span`
  color: green !important;
  padding-right: 0.5rem;
`;

const StyledCartSpan = styled.span``;

export class DesktopNav extends Component {
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
        <Button size="small" inverted={!fixed} as={NavLink} to="/login">
          Log in
        </Button>
        <Button
          inverted={!fixed}
          primary={fixed}
          style={{ marginLeft: "0.5em" }}
          as={NavLink}
          to="/pricing"
          size="small"
        >
          Sign Up
        </Button>
      </Fragment>
    );
  }

  renderUserLabel() {
    const { username, current_membership } = this.props.user;

    return (
      username && (
        <Fragment>
          <StyledSpan as={Link} to="/user-profile">
            <Icon name="user" size="small" />
            {username}
          </StyledSpan>
          <StyledSpan as={Link} to="/pricing">
            <Label
              color={current_membership === "pro" ? "orange" : "teal"}
              size="tiny"
            >
              {current_membership.toUpperCase()}
            </Label>
          </StyledSpan>
        </Fragment>
      )
    );
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

  renderNavigationLinks() {
    const { isActive } = this.state;
    return Object.keys(navLinkText).map(index => {
      const { header, key } = navLinkText[index];

      return (
        <Menu.Item
          key={index}
          active={isActive[key] === true ? true : false}
          as={NavLink}
          to={key === "home" ? "" : `/${key}`}
          onClick={this.showActiveLink.bind(this, key)}
        >
          {header}
        </Menu.Item>
      );
    });
  }

  render() {
    const { fixed } = this.state;

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
            {this.renderNavigationLinks()}
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
