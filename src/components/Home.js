import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Dropdown, Image, Menu, Button } from "semantic-ui-react";

import { logOut } from "../actions/index";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.handlelogout = this.handlelogout.bind(this);
  }

  handlelogout() {
    this.props.logOut();
  }
  render() {
    return (
      <div>
        <Button onClick={this.handlelogout}>Logout</Button>
      </div>
    );
  }
}

export default connect(
  null,
  { logOut }
)(Home);
