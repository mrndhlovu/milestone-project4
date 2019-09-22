import React from "react";
import { Link } from "react-router-dom";

import { Menu } from "semantic-ui-react";

import { NAVIGATION_LINKS } from "../../constants/constants";

const MobileNavigationLinks = ({ handleSidebarHide }) => {
  return Object.keys(NAVIGATION_LINKS).map(index => {
    const { header, key } = NAVIGATION_LINKS[index];

    return (
      <Menu.Item
        key={index}
        onClick={() => handleSidebarHide()}
        as={Link}
        name={key}
        to={key === "home" ? "" : `/${key}`}
      >
        {header}
      </Menu.Item>
    );
  });
};

export default MobileNavigationLinks;
