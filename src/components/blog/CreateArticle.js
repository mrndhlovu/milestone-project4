import React from "react";

import { Container, Form, Segment } from "semantic-ui-react";
import SubmitButton from "../sharedComponents/SubmitButton";

const CreateArticle = ({ header, handleChange }) => {
  return (
    <Container>
      <Segment text style={{ marginTop: 30 }}>
        <Form>
          <Form.Group widths="equal">
            <Form.Input fluid label="Title" placeholder="Last name" />
          </Form.Group>
          <Form.TextArea
            style={{ minHeight: 300 }}
            label="About"
            placeholder="Article text here..."
          />

          {<SubmitButton buttonText="Publish" />}
        </Form>
      </Segment>
    </Container>
  );
};

export default CreateArticle;
