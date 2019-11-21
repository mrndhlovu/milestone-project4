import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { List, Icon, Segment, Header } from "semantic-ui-react";

const UserPurchases = ({ purchases, accountType, allAccess }) => {
  const { tickets, donations } = purchases;

  const renderPurchases = () => {
    return Object.keys(tickets).map(key => {
      const { title, id } = tickets[key];
      return (
        <Fragment key={key}>
          <List.Item>
            <Icon name="check circle" color="olive" />
            <List.Content>
              <List.Header as={Link} to={`ticket/${id}`}>
                {title}
              </List.Header>
            </List.Content>
          </List.Item>
        </Fragment>
      );
    });
  };

  const renderDonations = () => {
    return Object.keys(donations).map(key => {
      return (
        <Fragment key={key}>
          <List.Item>
            <List.Header>
              <List.Content>
                <Icon name="heart" color="red" /> € {donations[key]} donation.
              </List.Content>
            </List.Header>
          </List.Item>
        </Fragment>
      );
    });
  };

  return (
    <Fragment>
      {allAccess && (
        <Segment>
          <Header content="Membership Upgrade" />

          <List.Content>
            <List.Header>
              <Icon name="check circle" color="olive" /> {accountType}
            </List.Header>
          </List.Content>
        </Segment>
      )}
      <Segment>
        <Header content="Tickets" />
        <List divided verticalAlign="middle">
          {renderPurchases()}
        </List>
      </Segment>
      <Segment>
        <Header content="Contributions" />
        <List divided verticalAlign="middle">
          {renderDonations()}
        </List>
      </Segment>
    </Fragment>
  );
};

export default UserPurchases;
