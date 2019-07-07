import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";

import LoginModal from "../auth/LoginModal";
import SignupModal from "../auth/SignupModal";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      showSignupModal: false
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
  }

  handleLoginClick() {
    this.setState({
      showLoginModal: !this.props.showLoginModal
    });
  }

  handleSignupClick() {
    this.setState({
      showSignupModal: !this.props.showSignupModal
    });
  }

  render() {
    if (this.state.showLoginModal) {
      return <LoginModal />;
    }
    if (this.state.showSignupModal) {
      return <SignupModal />;
    }
    return (
      <Fragment>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>
            <Link to="/"> Unicorn Attractor</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link>
                <Link to="/tickets"> Tickets</Link>
              </Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link onClick={this.handleLoginClick}>Login</Nav.Link>
              <Nav.Link onClick={this.handleSignupClick}>Sign up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Fragment>
    );
  }
}

export default withRouter(Header);
