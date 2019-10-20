import React, { Fragment } from "react";
import { Icon } from "semantic-ui-react";

const TicketsIcon = ({ votes, views, status }) => {
  return (
    <Fragment>
      <Icon
        style={{ fontSize: "1rem" }}
        name="thumbs up outline"
        color="black"
        size="large"
      />
      <span style={{ paddingRight: 10 }}>{votes > 0 ? votes : 0}</span>

      <Icon
        style={{ fontSize: "1rem" }}
        name="eye"
        color="black"
        size="large"
      />
      <span style={{ paddingRight: 10, fontSize: "0.8rem" }}>
        {views > 0 ? views : 0}
      </span>
      <span style={{ fontSize: "0.8rem" }}>{status.toUpperCase()}</span>
    </Fragment>
  );
};

export default TicketsIcon;
