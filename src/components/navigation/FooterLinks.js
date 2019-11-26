import React from "react";
import { NavLink } from "react-router-dom";

import { Header, List } from "semantic-ui-react";

import { FOOTER_LINKS } from "../../constants/constants";

const renderList = () => {
  return Object.keys(FOOTER_LINKS).map(index => {
    const { header, key } = FOOTER_LINKS[index];
    return (
      <List.Item as={NavLink} to={`/${key}`} key={index}>
        {header}
      </List.Item>
    );
  });
};

const FooterLinks = () => {
  return (
    <div>
      <Header inverted as="h4" content="Menu" />
      <List link inverted data-test-id="footer-links">
        {renderList()}
      </List>
    </div>
  );
};

export default FooterLinks;
