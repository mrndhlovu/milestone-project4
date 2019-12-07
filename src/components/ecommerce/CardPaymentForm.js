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
      </Segment>
    </Container>
  );
};

export default CardPaymentForm;
