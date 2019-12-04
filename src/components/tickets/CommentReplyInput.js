import React from "react";

import { Form, Button } from "semantic-ui-react";

import { COMMENT_TYPE } from "../../constants/constants";

const CommentReplyInput = ({
  id,
  handleCreateComment,
  handleSubmit,
  showReplyInput,
  buttonDisabled,
  handleOnBlur
}) => {
  return (
    showReplyInput && (
      <Form reply>
        <Form.TextArea
          onChange={event => handleCreateComment(event, COMMENT_TYPE.reply)}
          onClick={handleOnBlur}
        />
        <Button
          content="Reply"
          disabled={buttonDisabled}
          onClick={() => handleSubmit(id)}
          labelPosition="left"
          icon="edit"
          color="blue"
          size="tiny"
        />
      </Form>
    )
  );
};

export default CommentReplyInput;
