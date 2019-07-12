import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import styled from "styled-components";

import { Container, Dropdown, Image, Menu, Button } from "semantic-ui-react";

import { logOut } from "../../actions/index";

// const SytledMenu = styled(Menu)`
//   height: 5rem;
// `;

// const SytledButton = styled(Button)``;

// export class NavHeader extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showLogin: true,
//       showSignUp: true,
//       showLogout: true
//     };

//     this.handleLogoutClick = this.handleLogoutClick.bind(this);
//   }

//   handleLogoutClick() {
//     console.log("logout");
//     this.props.logOut();
//     this.props.history.push("/");
//   }

//   renderAuthNavLinks() {
//     const { sessionToken } = this.props;
//     if (sessionToken === null) {
//       return (
//         <Fragment>
//           <Menu.Item position="right">
//             <Link to="/login">Login</Link>
//           </Menu.Item>
//           <Menu.Item>
//             <Link to="/signup">Signup</Link>
//           </Menu.Item>
//         </Fragment>
//       );
//     } else {
//       return (
//         <Fragment>
//           <Menu.Item position="right" onClick={this.handleLogoutClickClick}>
//             <Link to="/">Logout</Link>
//           </Menu.Item>
//         </Fragment>
//       );
//     }
//   }

//   render() {
//     return (
//       <Fragment>
//         <SytledMenu fixed="top" inverted>
//           <Container>
//             <Menu.Item as="h2">
//               <Image
//                 size="mini"
//                 src="/logo.png"
//                 style={{ marginRight: "1.5em" }}
//               />
//               <Link to="/">UnicornAttractor</Link>
//             </Menu.Item>
//             <Menu.Item>
//               <Link to="/">Home</Link>
//             </Menu.Item>

//             <Dropdown item simple text="Dropdown">
//               <Dropdown.Menu>
//                 <Dropdown.Item>
//                   <Link to="signup">Signup</Link>
//                 </Dropdown.Item>
//                 <Dropdown.Item>List Item</Dropdown.Item>
//                 <Dropdown.Divider />
//                 <Dropdown.Header>Header Item</Dropdown.Header>
//                 <Dropdown.Item>
//                   <i className="dropdown icon" />
//                   <span className="text">Submenu</span>
//                   <Dropdown.Menu>
//                     <Dropdown.Item>
//                       <Link to="login">Login</Link>
//                     </Dropdown.Item>
//                     <Dropdown.Item>List Item</Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown.Item>
//                 <Dropdown.Item>List Item</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//             {this.renderAuthNavLinks()}
//           </Container>
//         </SytledMenu>
//       </Fragment>
//     );
//   }
// }

// const mapStateToProps = state => {
//   console.log("state from nav: ", state);

//   return {
//     auth: state
//   };
// };

// export default connect(
//   mapStateToProps,
//   { logOut }
// )(NavHeader);
