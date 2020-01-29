import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { Form as FinalForm, Field } from "react-final-form";

import { IIdea } from "../../../app/models/idea";

import IdeaStore from "../../../app/stores/ideaStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";

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

  // const handleSubmit = () => {
  //   if (idea.id.length === 0) {
  //     let newIdea = {
  //       ...idea,
  //       id: uuid()
  //     };

  //     createIdea(newIdea).then(() => history.push(`/ideas/${newIdea.id}`));
  //   } else {
  //     editIdea(idea).then(() => history.push(`/ideas/${idea.id}`));
  //   }
  // };

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={idea.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Description"
                  rows={3}
                  value={idea.description}
                  component={TextAreaInput}
                />
                <Field
                  name="category"
                  options={category}
                  placeholder="Category"
                  value={idea.category}
                  component={SelectInput}
                />
                <Field
                  name="created"
                  placeholder="Created"
                  value={new Date(idea.created)}
                  component={DateInput}
                />
                <Field
                  name="updated"
                  placeholder="Updated"
                  value={new Date(idea.updated)}
                  component={DateInput}
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
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(IdeaForm);
