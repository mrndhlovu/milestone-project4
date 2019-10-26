import React from "react";
import { NavLink } from "react-router-dom";

import { Button } from "semantic-ui-react";

function EditButtons({
  isTicket,
  handleTicketDelete,
  handleArticleDelete,
  id,
  isOwner
}) {
  return (
    isOwner && (
      <div style={{ paddingTop: 10 }}>
        <Button.Group floated="right" size="tiny">
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
              isTicket
                ? () => handleTicketDelete()
                : () => handleArticleDelete()
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
