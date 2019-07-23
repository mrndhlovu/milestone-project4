import PropTypes from "prop-types";
import React, { Component } from "react";

import LoginModal from "../components/userAuth/LoginModal";
import SignupModal from "../components/userAuth/SignupModal";

import MobileSideBar from "../components/navigation/MobileSideBar";

import { Responsive, Sidebar } from "semantic-ui-react";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class MobileViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      showSignupModal: false
    };
  }

  render() {
    const { showLoginModal, showSignupModal } = this.state;

    if (showLoginModal) {
      return <LoginModal />;
    }
    if (showSignupModal) {
      return <SignupModal />;
    }

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <MobileSideBar {...this.props} />
      </Responsive>
    );
  }
}

MobileViewContainer.propTypes = {
  children: PropTypes.node
};

export default MobileViewContainer;
