import React from "react";

import styled from "styled-components";

import { getNetPrice } from "../../utils/appCheckoutUtils";

import {
  List,
  Container,
  Divider,
  Header,
  Accordion,
  Icon,
  Segment
} from "semantic-ui-react";

const SytledContainer = styled(Container)`
  padding: 2rem 2rem;
`;

const styles = { paddingTop: 0, fontSize: 11, color: "#f2711c" };

export const CartItem = ({
  total,
  header,
  description,
  handleClick,
  isOpen,
  showDeleteButton,
  cancelTranscation
}) => {
  const renderDescription = () => {
    return description.map((element, index) => {
      return (
        <List as="ul" key={index}>
          <List.Item as="li">{element}</List.Item>
        </List>
      );
    });
  };

  return (
    <List.Item>
      <List.Content>
        <Accordion fluid styled color="orange">
          <Accordion.Title active={true} onClick={() => handleClick()}>
            <List.Content floated="right" as="a" style={styles}>
              <Icon
                name={isOpen ? "minus" : "add"}
                size="small"
                floated="right"
              />
              <span>{isOpen ? "Hide" : "Show"} Details</span>
            </List.Content>
            <span>{header}</span>
          </Accordion.Title>
          <Accordion.Content active={!isOpen}>
            <SytledContainer>
              <List.Description>{renderDescription()}</List.Description>
            </SytledContainer>

            <List.Item>
              {showDeleteButton && (
                <List.Content floated="right" as="a">
                  <Icon name="cancel" onClick={() => cancelTranscation()} />
                </List.Content>
              )}

              {showDeleteButton && (
                <List.Content>Cancel transcation</List.Content>
              )}
              <Divider />
              <List.Content floated="right">
                <List.Header>€ {getNetPrice(total)}</List.Header>
              </List.Content>

              <List.Content>Net Price</List.Content>
              <Divider />
              <List.Content floated="right">
                <List.Header>
                  € {total - getNetPrice(total).toFixed(2)}
                </List.Header>
              </List.Content>
              <List.Content>Vat(9%)</List.Content>
            </List.Item>
          </Accordion.Content>
        </Accordion>
      </List.Content>
      <List floated="right" horizontal>
        <Segment>
          <Header as="h5">Total: € {total}</Header>
        </Segment>
      </List>
    </List.Item>
  );
};

export default CartItem;
