import React from "react";
import { NavLink } from "react-router-dom";

import { Button } from "semantic-ui-react";

function EditButtons({ onDelete, ticketId }) {
  return (
    <div>
      <Button.Group floated="right">
        <Button color="blue" size="tiny" as={NavLink} to="/create-ticket">
          Create
        </Button>
        <Button color="blue" as={NavLink} to={`/edit-ticket/${ticketId}`}>
          Edit
        </Button>
        <Button color="red" onClick={onDelete}>
          Delete
        </Button>
      </Button.Group>
    </div>
  );
}

export default EditButtons;
