import React from "react";

import { Card, Segment, Header } from "semantic-ui-react";

import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
import EditButtons from "./EditButtons";
import TicketDetailStats from "./TicketDetailStats";

const TicketDetail = ({
  description,
  isLoading,
  title,
  id,
  owner,
  handleTicketDelete,
  isProMember,
  dataReceived,
  votes,
  views,
  handleVoteClick
}) => {
  return isLoading ? (
    <UILoadingSpinner />
  ) : (
    dataReceived && (
      <Segment.Group style={{ paddingLeft: 10 }}>
        <Segment.Group horizontal>
          <Segment>
            <Header content={title.toUpperCase()} color="blue" />
          </Segment>

          <Segment>
            {isProMember && (
              <EditButtons
                handleTicketDelete={() => handleTicketDelete()}
                ticketId={id}
                owner={owner}
              />
            )}
          </Segment>
        </Segment.Group>
        <Segment>
          <Card.Content description={description} />
        </Segment>

        <Segment>
          <TicketDetailStats
            handleVoteClick={() => handleVoteClick(id)}
            isProMember={isProMember}
            votes={votes}
            views={views}
            id={id}
          />
        </Segment>
      </Segment.Group>
    )
  );
};

export default TicketDetail;
