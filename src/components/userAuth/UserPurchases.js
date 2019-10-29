import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { List, Icon, Card } from "semantic-ui-react";

const UserPurchases = ({ purchases, accountType, allAccess }) => {
  const { tickets } = purchases;

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

  return (
    <Fragment>
      <Card fluid>
        <Card.Content>
          <Card.Header as="h2" attached="top">
            Purchases
          </Card.Header>
        </Card.Content>
        <Card.Content>
          {allAccess && (
            <Fragment>
              <Icon name="check circle" color="olive" />
              <List.Content>
                <List.Header>{accountType}</List.Header>
              </List.Content>
            </Fragment>
          )}
          <List divided verticalAlign="middle">
            {renderPurchases()}
          </List>
        </Card.Content>
      </Card>
    </Fragment>
  );
};

export default UserPurchases;
