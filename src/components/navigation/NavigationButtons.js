import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import { Button } from "semantic-ui-react";
import UpgradeCtaButton from "../sharedComponents/UpgradeCtaButton";

export const NavigationButtons = ({
  isAuthenticated,
  handleLogout,
  fixed,
  allAccess
}) => {
  return isAuthenticated ? (
    <Fragment>
      <Button
        inverted={!fixed}
        primary={fixed}
        style={{ marginLeft: "0.5em" }}
        onClick={() => handleLogout()}
      >
        Log out
      </Button>
      {!allAccess && <UpgradeCtaButton />}
    </Fragment>
  ) : (
    <Fragment>
      <Button size="small" inverted={!fixed} as={NavLink} to="/login">
        Log in
      </Button>
      <Button
        inverted={!fixed}
        primary={fixed}
        style={{ marginLeft: "0.5em" }}
        as={NavLink}
        to="/signup"
        size="small"
      >
        Sign Up
      </Button>
    </Fragment>
  );
};

export default NavigationButtons;
