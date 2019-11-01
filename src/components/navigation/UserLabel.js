import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import { Feed } from "semantic-ui-react";

export const UserLabel = ({ image }) => {
  return (
    <Fragment>
      <Feed>
        <Feed.Event style={{ marginTop: 10 }}>
          <Feed.Label as={NavLink} to="/user-profile">
            <img src={image} />
          </Feed.Label>

          <Feed.Content></Feed.Content>
        </Feed.Event>
      </Feed>
    </Fragment>
  );
};

export default UserLabel;
