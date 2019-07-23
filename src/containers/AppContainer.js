import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import MobileViewContainer from "./MobileViewContainer";
import DesktopViewContainer from "./DesktopViewContainer";
import { authState } from "../actions/index";
import NavFooter from "../components/navigation/NavFooter";

import { Segment } from "semantic-ui-react";

const StyledDiv = styled.div`
  min-height: 50vh;
  overflow: hidden;
  padding-bottom: 2rem;
`;

const ResponsiveContainer = ({ children }) => (
  <Fragment>
    <DesktopViewContainer>
      <StyledDiv>{children}</StyledDiv>
    </DesktopViewContainer>
    <MobileViewContainer>{children}</MobileViewContainer>
  </Fragment>
);

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { token: "" };
  }

  componentDidMount() {
    this.props.authenticate();
  }

  render() {
    return (
      <ResponsiveContainer>
        <StyledDiv>{this.props.children}</StyledDiv>
        <Segment inverted vertical style={{ padding: "5em 0em" }}>
          <NavFooter />
        </Segment>
      </ResponsiveContainer>
    );
  }
}

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const mapStateToProps = state => {
  return {
    userAuth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: () => dispatch(authState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
