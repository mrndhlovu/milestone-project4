import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { Container, Dropdown, Image, Menu } from "semantic-ui-react";

const SyledMenu = styled(Menu)`
  height: 5rem;
`;

export class NavHeader extends Component {
  render() {
    return (
      <Fragment>
        <SyledMenu fixed="top" inverted>
          <Container>
            <Menu.Item>
              <Image
                size="mini"
                src="/logo.png"
                style={{ marginRight: "1.5em" }}
              />
              <Link to="/">Unicorn</Link>
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

            <Menu.Item>
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/">Logout</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/signup">Signup</Link>
            </Menu.Item>
          </Container>
        </SyledMenu>
      </Fragment>
    );
  }
}

export default NavHeader;
