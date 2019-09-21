import React from "react";

import styled from "styled-components";

import { Card, Statistic, Icon } from "semantic-ui-react";

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
    <Card.Content extra>
      <Statistic.Group size="mini" color="grey">
        <Statistic>
          <Statistic.Value>{votes > 0 ? votes : 0}</Statistic.Value>
          <StyledSpan>
            <Statistic.Label as="a">
              <Icon
                name="thumbs up"
                size="large"
                color="grey"
                disabled={!is_pro_member}
                onClick={() => handleVoteClick(id)}
              />
            </Statistic.Label>
          </StyledSpan>
        </Statistic>
        <Statistic>
          <Statistic.Value>{views > 0 ? views : 0}</Statistic.Value>
          <StyledSpan>
            <Statistic.Label>Views</Statistic.Label>
          </StyledSpan>
        </Statistic>
      </Statistic.Group>
    </Card.Content>
  );
};

export default TicketDetailStats;
