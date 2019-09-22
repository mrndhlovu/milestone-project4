import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Container, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

import { logOut } from "../actions/AuthActions";
import { getUser, getUserProfile } from "../selectors/appSelectors";
import MobileNavigationLinks from "../components/navigation/MobileNavigationLinks";
import MobileSideBarButtons from "../components/navigation/MobileSideBarButtons";
import UserLabel from "../components/navigation/UserLabel";

export class MobileSideBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      showSignupModal: false,
      sidebarOpened: false
    };

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleSidebarHide = this.handleSidebarHide.bind(this);
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

  render() {
    const { sidebarOpened } = this.state;
    const {
      children,
      user: { isAuthenticated }
    } = this.props;

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
          <MobileNavigationLinks handleSidebarHide={this.handleSidebarHide} />
          <MobileSideBarButtons
            isAuthenticated={isAuthenticated}
            handleLogoutClick={this.handleLogoutClick}
          />
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
                {/* <UserLabel
                  username={username}
                  current_membership={current_membership}
                /> */}
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
  console.log(state);

  return {
    user: getUser(state),
    userProfile: getUserProfile(state)
  };
};

export default connect(
  mapStateToProps,
  { logOut }
)(withRouter(MobileSideBarContainer));
