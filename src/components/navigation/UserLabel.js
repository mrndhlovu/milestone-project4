import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import { Feed } from "semantic-ui-react";

import userImage from "../../images/userImage.png";

export const UserLabel = () => {
  return (
    <Fragment>
      <Feed>
        <Feed.Event style={{ marginTop: 10 }}>
          <Feed.Label as={NavLink} to="/user-profile">
            <img src={userImage} />
          </Feed.Label>

          <Feed.Content></Feed.Content>
        </Feed.Event>
      </Feed>
    </Fragment>
  );
};

export default UserLabel;
