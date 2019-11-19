import React from "react";

import { List, Icon } from "semantic-ui-react";

const MembershipServiceList = ({ services, listId }) => {
  return services.map((service, index) => {
    return (
      <List style={{ paddingLeft: 20 }} key={index}>
        <List.Item>
          <Icon name="check" />
          <List.Content data-test-id={listId}>
            <List.Description>{service}</List.Description>
          </List.Content>
        </List.Item>
      </List>
    );
  });
};

export default MembershipServiceList;
