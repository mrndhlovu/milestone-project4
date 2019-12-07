import React, { Fragment } from "react";

import { Card, Segment, Header, Container } from "semantic-ui-react";

import EditButtons from "../sharedComponents/EditButtons";
import TicketDetailStats from "./TicketDetailStats";
import DynamicHeader from "../sharedComponents/DynamicHeader";
import TicketSolution from "./TicketSolution";
import CommentsContainer from "../../containers/CommentsContainer";
import Notification from "../sharedComponents/Notification";
import { DEFAULT_IMAGES } from "../../constants/constants";

const TicketDetail = ({
  handleAccordionClick,
  addToCart,
  data,
  handleTicketDelete,
  allAccess,
  handleVoteClick,
  activeIndex,
  index,
  solution,
  buttonText,
  isAuthenticated,
  createComment,
  createReply,
  user
}) => {
  const {
    data: { title, description, views, id },
    isOwner,
    comments,
    votes
  } = data;

  return (
    <Fragment>
      <DynamicHeader title={title} image="" dataTestId="ticket-detail-header" />
      <Container
        style={{ paddingTop: 50 }}
        data-test-id="ticket-detail-container"
      >
        <Segment.Group style={{ paddingLeft: 10 }}>
          <Segment.Group horizontal>
            <Segment>
              <Header content={title.toUpperCase()} color="blue" />
            </Segment>

            <Segment>
              {allAccess && (
                <EditButtons
                  handleTicketDelete={handleTicketDelete}
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
              handleVoteClick={handleVoteClick}
              allAccess={allAccess}
              votes={votes}
              views={views}
              id={id}
            />
          </Segment>
        </Segment.Group>

        <TicketSolution
          handleAccordionClick={handleAccordionClick}
          activeIndex={activeIndex}
          index={index}
          solution={solution}
          isAuthenticated={isAuthenticated}
          addToCart={addToCart}
          id={id}
          buttonText={buttonText}
        />

        {allAccess ? (
          <CommentsContainer
            comments={comments}
            ticketId={id}
            isTicket={true}
            userId={user.id}
            createComment={createComment}
            createReply={createReply}
          />
        ) : (
          <Notification
            message="To view and make comments you need to upgrade your account "
            linkText="Unicorn Pro Account."
            redirect="/pricing"
            iconName="list"
            dataTestId="ticket-comments-message"
          />
        )}
      </Container>
    </Fragment>
  );
};

export default TicketDetail;
