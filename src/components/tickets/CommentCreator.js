import React from "react";

import { Form, Button } from "semantic-ui-react";

const CommentCreator = ({
  handleCreateComment,
  handleOnBlur,
  handleSubmit,
  buttonDisabled
}) => {
  return (
    <Form reply>
      <Form.TextArea
        onClick={handleOnBlur}
        onChange={e => handleCreateComment(e)}
      />
      <Button
        content="Comment"
        labelPosition="left"
        disabled={buttonDisabled}
        icon="edit"
        size="small"
        color="orange"
        onClick={() => handleSubmit()}
      />
    </Form>
  );
};

export default CommentCreator;
