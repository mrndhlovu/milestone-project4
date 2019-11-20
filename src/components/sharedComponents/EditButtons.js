import React from "react";
import { NavLink } from "react-router-dom";

import { Button } from "semantic-ui-react";

function EditButtons({
  isTicket,
  handleTicketDelete,
  handleDelete,
  id,
  isOwner,
  dataTestId
}) {
  return (
    isOwner && (
      <div style={{ paddingTop: 10 }}>
        <Button.Group floated="right" size="tiny" data-test-id={dataTestId}>
          <Button
            size="tiny"
            as={NavLink}
            to={isTicket ? "/create-ticket" : "/new-article"}
          >
            Create
          </Button>
          <Button
            as={NavLink}
            to={`/edit-${isTicket ? "ticket" : "article"}/${id}`}
          >
            Edit
          </Button>
          <Button
            color="blue"
            onClick={
              isTicket ? () => handleTicketDelete() : () => handleDelete()
            }
          >
            Delete
          </Button>
        </Button.Group>
      </div>
    )
  );
}

export default EditButtons;
