import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import { Header, List } from "semantic-ui-react";

import { FOOTER_LINKS } from "../../constants/constants";

const renderList = () => {
  return Object.keys(FOOTER_LINKS).map(index => {
    const { header, key } = FOOTER_LINKS[index];
    return (
      <Fragment key={index}>
        <List.Item as={NavLink} to={`/${key}`}>
          {header}
        </List.Item>
      </Fragment>
    );
  });
};

const FooterLinks = () => {
  return (
    <div>
      <Header inverted as="h4" content="Menu" />
      <List link inverted>
        {renderList()}
      </List>
    </div>
  );
};

export default FooterLinks;
