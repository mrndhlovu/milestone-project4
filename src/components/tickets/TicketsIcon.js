import React, { Fragment } from "react";
import { Icon } from "semantic-ui-react";

const TicketsIcon = ({ votes, views, status }) => {
  return (
    <Fragment>
      <Icon name="thumbs up outline" color="black" size="large" />
      <span style={{ paddingRight: 10 }}>{votes > 0 ? votes : 0}</span>

      <Icon name="eye" color="black" size="large" />
      <span style={{ paddingRight: 10 }}>{views > 0 ? views : 0}</span>
      {status.toUpperCase()}
    </Fragment>
  );
};

export default TicketsIcon;
