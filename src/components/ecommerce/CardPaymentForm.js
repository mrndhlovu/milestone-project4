import React from "react";
import styled from "styled-components";

import {
  Form,
  Card,
  Segment,
  Button,
  Container,
  Accordion,
  Icon
} from "semantic-ui-react";

import { CardElement } from "react-stripe-elements";
import BillingDetails from "./BillingDetails";

const StyledSpan = styled(Container)`
  font-size: 18px;
`;

const CardPaymentForm = ({
  handleOnFocus,
  handlePayNow,
  isDisabled,
  isLoading,
  handleAccordionClick,
  activeIndex,
  handleChange
}) => {
  return (
    <Container style={{ borderRadius: 0 }}>
      <Segment>
        <Accordion>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={() => handleAccordionClick(0)}
          >
            <StyledSpan>
              <Icon name="dropdown" />
              Personal Details
            </StyledSpan>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <BillingDetails handleChange={handleChange} />
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={() => handleAccordionClick(1)}
          >
            <StyledSpan>Payment</StyledSpan>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1 || 2}>
            <Card fluid>
              <Card.Content>
                <Form.Group widths="equal">
                  <Segment>
                    <CardElement onFocus={() => handleOnFocus()} />
                  </Segment>
                </Form.Group>
              </Card.Content>
              <Card.Content extra>
                <Button
                  color="orange"
                  fluid
                  onClick={() => handlePayNow()}
                  loading={isLoading}
                  disabled={isDisabled}
                >
                  PAY NOW
                </Button>
              </Card.Content>
            </Card>
          </Accordion.Content>
        </Accordion>
      </Segment>
    </Container>
  );
};

export default CardPaymentForm;
