import React from "react";
import { NavLink } from "react-router-dom";

import { NAVIGATION_LINKS } from "../../constants/constants";

import { Menu } from "semantic-ui-react";

export const NavigationLinks = ({ isActive, showActiveLink }) => {
  return Object.keys(NAVIGATION_LINKS).map(index => {
    const { header, key } = NAVIGATION_LINKS[index];

    return (
      <Menu.Item
        key={index}
        active={isActive[key]}
        as={NavLink}
        to={key}
        onClick={() => showActiveLink(key)}
      >
        {header}
      </Menu.Item>
    );
  });
};

export default NavigationLinks;
