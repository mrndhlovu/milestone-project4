import React from "react";
import { NavLink } from "react-router-dom";

import { Button } from "semantic-ui-react";
import { isTicketOwner } from "../../utils/appUtils";

function EditButtons({ handleTicketDelete, ticketId, owner, isProMember }) {
  return (
    isTicketOwner(owner) && (
      <div style={{ paddingTop: 10 }}>
        <Button.Group floated="right" size="tiny">
          <Button size="tiny" as={NavLink} to="/create-ticket">
            Create
          </Button>
          <Button as={NavLink} to={`/edit-ticket/${ticketId}`}>
            Edit
          </Button>
          <Button color="blue" onClick={() => handleTicketDelete()}>
            Delete
          </Button>
        </Button.Group>
      </div>
    )
  );
}

export default EditButtons;
