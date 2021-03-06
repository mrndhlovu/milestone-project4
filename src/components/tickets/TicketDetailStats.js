import React from "react";

import { Statistic, Icon, Header } from "semantic-ui-react";

const TicketDetailStats = ({
  handleVoteClick,
  allAccess,
  views,
  votes,
  id
}) => {
  return (
    <Statistic.Group size="mini" color="black" data-test-id="detail-stats">
      <Statistic as="a">
        <Header as="h5" style={{ marginBottom: 0 }}>
          {votes > 0 ? votes : 0}
        </Header>

        <Icon
          link
          name="thumbs up"
          color="grey"
          as="i"
          fitted
          disabled={!allAccess}
          data-test-id="detail-like-button"
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
