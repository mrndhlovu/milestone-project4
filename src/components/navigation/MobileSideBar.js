import React, { Component, Fragment } from "react";
import { Link, withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";

import styled from "styled-components";
import { Container, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

import { NAVIGATION_LINKS } from "../../constants/constants";
import { logOut } from "../../actions/AuthActions";

const StyledSpan = styled.span`
  margin: 13px 0 0 auto;
  color: grey;
`;

export class MobileSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      showSignupModal: false,
      sidebarOpened: false
    };

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleSidebarHide = this.handleSidebarHide.bind(this);
    this.renderUserLabel = this.renderUserLabel.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleSidebarHide() {
    this.setState({ sidebarOpened: false });
  }

  handleToggle() {
    this.setState({ sidebarOpened: true });
  }

  handleLogoutClick() {
    this.props.logOut();
    window.location.reload();
  }

  renderUserLabel() {
    const { username } = this.props.user;

    return username ? (
      <StyledSpan>
        <Icon name="user" />
        {username}
      </StyledSpan>
    ) : null;
  }

  renderAuthButtons() {
    const { sessionToken } = this.props.userAuth;

    return sessionToken ? (
      <Menu.Item onClick={this.handleLogoutClick}>Log out</Menu.Item>
    ) : (
      <Fragment>
        <Menu.Item as={NavLink} to="/login">
          Log in
        </Menu.Item>
        <Menu.Item as={NavLink} to="/pricing">
          Sign Up
        </Menu.Item>
      </Fragment>
    );
  }

  renderNavigationLinks() {
    return Object.keys(NAVIGATION_LINKS).map(index => {
      const { header, key } = NAVIGATION_LINKS[index];

      return (
        <Menu.Item
          key={index}
          onClick={this.handleSidebarHide}
          as={Link}
          name={key}
          to={key === "home" ? "" : `/${key}`}
        >
          {header}
        </Menu.Item>
      );
    });
  }

  render() {
    const { sidebarOpened } = this.state;
    const { children } = this.props;

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
          {this.renderNavigationLinks()}
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
                {this.renderUserLabel()}
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
  return { userAuth: state.auth, user: state.user.user };
};

export default connect(
  mapStateToProps,
  { logOut }
)(withRouter(MobileSideBar));
