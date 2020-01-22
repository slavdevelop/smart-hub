import React from "react";
import { Segment, Form } from "semantic-ui-react";

export const IdeaForm = () => {
  return (
    <Segment>
      <Form>
        <Form.Input placeholder="Title" />
        <Form.TextArea rows={2} placeholder="Description" />
        <Form.Input placeholder="Category" />
        <Form.Input type="date" placeholder="Created" />
        <Form.Input type="date" placeholder="Updated" />
      </Form>
    </Segment>
  );
};
