import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Button, Container, Menu } from "semantic-ui-react";

import { authState } from "../../actions/index";
import LoginModal from "../userAuth/LoginModal";
import SignupModal from "../userAuth/SignupModal";

export class DesktopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      showSignupModal: false,
      fixed: false
    };
    console.log("D View Props", this.props);
  }

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });
  handleSignupClick = () => this.setState({ showSignupModal: true });
  handleLoginClick = () => this.setState({ showLoginModal: true });

  componentDidMount() {
    this.props.authenticate();
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
              <Button
                inverted={!fixed}
                primary={fixed}
                style={{ marginLeft: "0.5em" }}
                onClick={this.handleLogoutClick}
              >
                Log out
              </Button>
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { userAuth: state.auth };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: () => dispatch(authState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DesktopNav));

// import React, { Component, Fragment } from "react";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";

// import styled from "styled-components";

// import { Container, Dropdown, Image, Menu, Button } from "semantic-ui-react";

// import { logOut } from "../../actions/index";

// // const SytledMenu = styled(Menu)`
// //   height: 5rem;
// // `;

// // const SytledButton = styled(Button)``;

// // export class NavHeader extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       showLogin: true,
// //       showSignUp: true,
// //       showLogout: true
// //     };

// //     this.handleLogoutClick = this.handleLogoutClick.bind(this);
// //   }

// //   handleLogoutClick() {
// //     console.log("logout");
// //     this.props.logOut();
// //     this.props.history.push("/");
// //   }

// //   renderAuthNavLinks() {
// //     const { sessionToken } = this.props;
// //     if (sessionToken === null) {
// //       return (
// //         <Fragment>
// //           <Menu.Item position="right">
// //             <Link to="/login">Login</Link>
// //           </Menu.Item>
// //           <Menu.Item>
// //             <Link to="/signup">Signup</Link>
// //           </Menu.Item>
// //         </Fragment>
// //       );
// //     } else {
// //       return (
// //         <Fragment>
// //           <Menu.Item position="right" onClick={this.handleLogoutClickClick}>
// //             <Link to="/">Logout</Link>
// //           </Menu.Item>
// //         </Fragment>
// //       );
// //     }
// //   }

// //   render() {
// //     return (
// //       <Fragment>
// //         <SytledMenu fixed="top" inverted>
// //           <Container>
// //             <Menu.Item as="h2">
// //               <Image
// //                 size="mini"
// //                 src="/logo.png"
// //                 style={{ marginRight: "1.5em" }}
// //               />
// //               <Link to="/">UnicornAttractor</Link>
// //             </Menu.Item>
// //             <Menu.Item>
// //               <Link to="/">Home</Link>
// //             </Menu.Item>

// //             <Dropdown item simple text="Dropdown">
// //               <Dropdown.Menu>
// //                 <Dropdown.Item>
// //                   <Link to="signup">Signup</Link>
// //                 </Dropdown.Item>
// //                 <Dropdown.Item>List Item</Dropdown.Item>
// //                 <Dropdown.Divider />
// //                 <Dropdown.Header>Header Item</Dropdown.Header>
// //                 <Dropdown.Item>
// //                   <i className="dropdown icon" />
// //                   <span className="text">Submenu</span>
// //                   <Dropdown.Menu>
// //                     <Dropdown.Item>
// //                       <Link to="login">Login</Link>
// //                     </Dropdown.Item>
// //                     <Dropdown.Item>List Item</Dropdown.Item>
// //                   </Dropdown.Menu>
// //                 </Dropdown.Item>
// //                 <Dropdown.Item>List Item</Dropdown.Item>
// //               </Dropdown.Menu>
// //             </Dropdown>
// //             {this.renderAuthNavLinks()}
// //           </Container>
// //         </SytledMenu>
// //       </Fragment>
// //     );
// //   }
// // }

// // const mapStateToProps = state => {
// //   console.log("state from nav: ", state);

// //   return {
// //     auth: state
// //   };
// // };

// // export default connect(
// //   mapStateToProps,
// //   { logOut }
// // )(NavHeader);
