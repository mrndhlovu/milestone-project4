import React, { Fragment } from "react";
import styled from "styled-components";

import { Segment, Container } from "semantic-ui-react";

import CommentsContainer from "../../containers/CommentsContainer";
import DynamicHeader from "../sharedComponents/DynamicHeader";
import EditButtons from "../sharedComponents/EditButtons";
import Notification from "../sharedComponents/Notification";
import TicketDetailStats from "./TicketDetailStats";
import TicketSolution from "./TicketSolution";
import { capitalizeFirstLetter, getFormatedDate } from "../../utils/appUtils";

const StyledContentSegment = styled(Segment)`
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  white-space: pre-wrap !important;
`;

const StyledContainer = styled(Container)`
  margin: 0 auto !important;
  padding-left: 10px !important;
`;

const StyledParagraph = styled.p`
  padding-bottom: 10px !important;
`;

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
    data: { title, description, views, id, created_at },
    isOwner,
    owner,
    comments,
    votes
  } = data;

  return (
    <div data-test-id="ticket-detail-container">
      <DynamicHeader title={title} image="" dataTestId="ticket-detail-header" />
      <StyledContainer>
        <Segment.Group horizontal>
          <Segment textAlign="center">
            <TicketDetailStats
              handleVoteClick={handleVoteClick}
              allAccess={allAccess}
              votes={votes}
              views={views}
              id={id}
            />
          </Segment>
          {allAccess && (
            <Segment>
              <EditButtons
                handleTicketDelete={handleTicketDelete}
                id={id}
                isOwner={isOwner}
                isTicket={true}
              />
            </Segment>
          )}
        </Segment.Group>
        <Segment.Group>
          <StyledContentSegment padded>
            <StyledParagraph>
              <small>
                By {capitalizeFirstLetter(owner)} | Created:
                {getFormatedDate(created_at)}
              </small>
            </StyledParagraph>
            {description}
          </StyledContentSegment>
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
        </Segment.Group>
      </StyledContainer>
    </div>
  );
};

export default TicketDetail;
