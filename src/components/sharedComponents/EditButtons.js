import React from "react";
import { NavLink } from "react-router-dom";

import { Button } from "semantic-ui-react";

function EditButtons({ handleTicketDelete, id, isOwner }) {
  return (
    isOwner && (
      <div style={{ paddingTop: 10 }}>
        <Button.Group floated="right" size="tiny">
          <Button size="tiny" as={NavLink} to="/create-ticket">
            Create
          </Button>
          <Button as={NavLink} to={`/edit-ticket/${id}`}>
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
