import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import { Menu } from "semantic-ui-react";

const MobileSideBarButtons = ({ isAuthenticated, handleLogoutClick }) => {
  return isAuthenticated ? (
    <Menu.Item onClick={() => handleLogoutClick()}>Log out</Menu.Item>
  ) : (
    <Fragment>
      <Menu.Item as={NavLink} to="/login">
        Log in
      </Menu.Item>
      <Menu.Item as={NavLink} to="/signup">
        Sign Up
      </Menu.Item>
    </Fragment>
  );
};

export default MobileSideBarButtons;
