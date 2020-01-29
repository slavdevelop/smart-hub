import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { v4 as uuid } from "uuid";

import { IIdea } from "../../../app/models/idea";

import IdeaStore from "../../../app/stores/ideaStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
  id: string;
}

const IdeaForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const ideaStore = useContext(IdeaStore);
  const {
    createIdea,
    editIdea,
    submitting,
    idea: initialFormState,
    loadIdea,
    clearIdea
  } = ideaStore;

  const [idea, setIdea] = useState<IIdea>({
    id: "",
    title: "",
    category: "",
    description: "",
    created: "",
    updated: ""
  });

  useEffect(() => {
    if (match.params.id && idea.id.length === 0) {
      loadIdea(match.params.id).then(
        () => initialFormState && setIdea(initialFormState)
      );
    }

    return () => {
      clearIdea();
    };
  }, [loadIdea, clearIdea, match.params.id, initialFormState, idea.id.length]);

  const handleSubmit = () => {
    if (idea.id.length === 0) {
      let newIdea = {
        ...idea,
        id: uuid()
      };

      createIdea(newIdea).then(() => history.push(`/ideas/${newIdea.id}`));
    } else {
      editIdea(idea).then(() => history.push(`/ideas/${idea.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setIdea({ ...idea, [name]: value });
  };

  return (
    <Grid>
      <Grid.Column width={10}>
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
              onClick={() => history.push("/ideas")}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(IdeaForm);
