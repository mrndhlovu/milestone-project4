import React from "react";
import { Header, Icon } from "semantic-ui-react";

const TicketsIcon = ({ votes, views, status }) => {
  return (
    <div floated="right">
      <Header as="h5">
        <Icon name="thumbs up outline" color="black" />
        {votes > 0 ? votes : 0}
      </Header>
      <hr />
      <Header as="h5">
        <Icon name="eye" color="black" />
        {views > 0 ? views : 0}
      </Header>
      <hr />
      <Header
        as="h5"
        color={
          status === "doing" ? "orange" : status === "done" ? "green" : "black"
        }
      >
        {status.toUpperCase()}
      </Header>
    </div>
  );
};

export default TicketsIcon;
