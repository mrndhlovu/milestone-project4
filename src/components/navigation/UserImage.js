import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import { Feed } from "semantic-ui-react";

export const UserImage = ({ image }) => {
  return (
    <Fragment>
      <Feed>
        <Feed.Event>
          <Feed.Label as={NavLink} to="/user-profile">
            <img src={image} alt={image} />
          </Feed.Label>

          <Feed.Content></Feed.Content>
        </Feed.Event>
      </Feed>
    </Fragment>
  );
};

export default UserImage;
