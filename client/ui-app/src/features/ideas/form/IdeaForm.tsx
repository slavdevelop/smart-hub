import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { v4 as uuid } from "uuid";

import { IIdea } from "../../../app/models/idea";

import IdeaStore from "../../../app/stores/ideaStore";
import { observer } from "mobx-react-lite";

interface IProps {
  idea: IIdea;
}

const IdeaForm: React.FC<IProps> = ({ idea: initialFormState }) => {
  const ideaStore = useContext(IdeaStore);
  const { createIdea, editIdea, submitting, cancelFormOpen } = ideaStore;

  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        created: "",
        updated: ""
      };
    }
  };

  const [idea, setIdea] = useState<IIdea>(initializeForm);

  const handleSubmit = () => {
    if (idea.id.length === 0) {
      let newIdea = {
        ...idea,
        id: uuid()
      };

      createIdea(newIdea);
    } else {
      editIdea(idea);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setIdea({ ...idea, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={idea.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={idea.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          value={idea.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name="created"
          type="datetime-local"
          placeholder="Created"
          value={idea.created}
        />
        <Form.Input
          onChange={handleInputChange}
          name="updated"
          type="datetime-local"
          placeholder="Updated"
          value={idea.updated}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={cancelFormOpen}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(IdeaForm);
