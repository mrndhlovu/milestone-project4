import React from "react";

import { Card, Segment, Header } from "semantic-ui-react";

import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
import EditButtons from "../sharedComponents/EditButtons";
import TicketDetailStats from "./TicketDetailStats";

const TicketDetail = ({
  isLoading,
  data,
  handleTicketDelete,
  allAccess,
  dataReceived,
  handleVoteClick,
  isOwner
}) => {
  const { title, description, votes, views, id } = data;

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
            {allAccess && (
              <EditButtons
                handleTicketDelete={() => handleTicketDelete()}
                id={id}
                isOwner={isOwner}
                isTicket={true}
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
            allAccess={allAccess}
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
