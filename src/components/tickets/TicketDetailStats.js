import React from "react";

import styled from "styled-components";

import { Card, Statistic, Icon, Header } from "semantic-ui-react";

const StyledSpan = styled.span`
  padding-left: 0.3rem !important;
  padding-top: 0.8rem !important;
`;

const TicketDetailStats = ({
  handleVoteClick,
  is_pro_member,
  views,
  votes,
  id
}) => {
  return (
    <Statistic.Group size="mini" color="black" style={{ marginLeft: 20 }}>
      <Statistic style={{ marginRight: 0 }} as="a">
        <Header as="h5" style={{ marginBottom: 0 }}>
          {votes > 0 ? votes : 0}
        </Header>
        <Icon
          name="thumbs up"
          color="grey"
          as="i"
          fitted
          disabled={!is_pro_member}
          onClick={() => handleVoteClick(id)}
        />
      </Statistic>
      <Statistic style={{ paddingLeft: 0 }}>
        <Header as="h5" style={{ marginBottom: 5 }}>
          {views > 0 ? views : 0}
        </Header>
        <Icon name="eye" color="grey" fitted />
      </Statistic>
    </Statistic.Group>
  );
};

export default TicketDetailStats;
