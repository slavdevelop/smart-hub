import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IIdea } from "../../../app/models/idea";
import { v4 as uuid } from "uuid";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  idea: IIdea;
  createIdea: (idea: IIdea) => void;
  editIdea: (idea: IIdea) => void;
}

export const IdeaForm: React.FC<IProps> = ({
  setEditMode,
  idea: initialFormState,
  createIdea,
  editIdea
}) => {
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
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
