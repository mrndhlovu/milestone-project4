import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { getHeaderObject } from "../../constants/headerConstants";

import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { capitalizeFirstLetter } from "../../utils/appUtils";

const StyledSegment = styled(Segment)`
  padding-bottom: 5rem !important;
  background-image: url(${props => props.image}) !important;
`;

export const PageHeader = ({
  mobile,
  hideButton,
  dataTestId,
  pageId,
  buttonId,
  userName,
  orderCount
}) => {
  const {
    headerText,
    headerButtonText,
    headerButtonUrl,
    subHeading
  } = getHeaderObject(pageId);

  const isOnShoppingCart = pageId === "checkout";
  const cartIsEmpty = orderCount === 0 || undefined;

  return (
    <StyledSegment
      textAlign="center"
      inverted
      vertical
      data-test-id={dataTestId}
    >
      <Header
        as="h1"
        content={
          isOnShoppingCart && !cartIsEmpty && userName
            ? `${userName.toLowerCase()} `
            : headerText
        }
        inverted
        style={{
          fontSize: mobile ? "2em" : "3em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: mobile ? "1em" : "1em"
        }}
      />
      <Header
        as="h2"
        content={
          isOnShoppingCart && !cartIsEmpty
            ? `You have ${orderCount} item${
                orderCount !== 1 ? "s" : ""
              } in your cart`
            : subHeading
        }
        inverted
        style={{
          fontSize: mobile ? "1.5em" : "1.7em",
          fontWeight: "normal",
          marginTop: mobile ? "0.5em" : "1.5em"
        }}
      />
      {!hideButton && (
        <Button
          data-test-id={buttonId}
          primary
          color="linkedin"
          size="large"
          as={NavLink}
          to={headerButtonUrl}
        >
          {headerButtonText}
          <Icon name="right arrow" />
        </Button>
      )}
    </StyledSegment>
  );
};

PageHeader.propTypes = {
  mobile: PropTypes.bool
};

export default PageHeader;
