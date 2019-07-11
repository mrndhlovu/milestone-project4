import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import styled from "styled-components";

import { Container, Dropdown, Image, Menu, Button } from "semantic-ui-react";

import { logOut } from "../../actions/index";

const SytledMenu = styled(Menu)`
  height: 5rem;
`;

const SytledButton = styled(Button)``;

export class NavHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: true,
      showSignUp: true,
      showLogout: true
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logOut();
    this.props.history("/");
  }

  checkSessionToken() {
    const { sessionToken } = this.props;
    if (sessionToken === null) {
      return (
        <Fragment>
          <Menu.Item position="right">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/signup">Signup</Link>
          </Menu.Item>
        </Fragment>
      );
    } else {
      return (
        <Menu.Item position="right">
          <SytledButton color="teal" onClick={this.props.handleLogout}>
            Logout
          </SytledButton>
        </Menu.Item>
      );
    }
  }

  render() {
    return (
      <Fragment>
        <SytledMenu fixed="top" inverted>
          <Container>
            <Menu.Item as="h2">
              <Image
                size="mini"
                src="/logo.png"
                style={{ marginRight: "1.5em" }}
              />
              <Link to="/">UnicornAttractor</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/">Home</Link>
            </Menu.Item>

            <Dropdown item simple text="Dropdown">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link to="signup">Signup</Link>
                </Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Header Item</Dropdown.Header>
                <Dropdown.Item>
                  <i className="dropdown icon" />
                  <span className="text">Submenu</span>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link to="login">Login</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {this.checkSessionToken()}
          </Container>
        </SytledMenu>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { logOut }
)(NavHeader);
