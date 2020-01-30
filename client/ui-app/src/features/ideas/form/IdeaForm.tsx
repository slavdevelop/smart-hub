import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { Form as FinalForm, Field } from "react-final-form";

import { IdeaFormValues } from "../../../app/models/idea";

import IdeaStore from "../../../app/stores/ideaStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from "revalidate";

const validate = combineValidators({
  title: isRequired({ message: "Idea title is required" }),
  category: isRequired("Category"),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters"
    })
  )(),
  created: isRequired("Created"),
  time: isRequired("Time"),
  updated: isRequired("Updated")
});

interface DetailParams {
  id: string;
}

const IdeaForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const ideaStore = useContext(IdeaStore);
  const { createIdea, editIdea, submitting, loadIdea } = ideaStore;

  const [idea, setIdea] = useState(new IdeaFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadIdea(match.params.id)
        .then(idea => setIdea(new IdeaFormValues(idea)))
        .finally(() => setLoading(false));
    }
  }, [loadIdea, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.created, values.time);
    const { created, time, ...idea } = values;
    idea.created = dateAndTime;

    if (!idea.id) {
      let newIdea = {
        ...idea,
        id: uuid()
      };
      createIdea(newIdea);
    } else {
      editIdea(idea);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={idea}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
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
                  options={categoryOptions}
                  placeholder="Category"
                  value={idea.category}
                  component={SelectInput}
                />
                <Form.Group width="equal">
                  <Field
                    name="created"
                    date={true}
                    placeholder="Created"
                    value={idea.created}
                    component={DateInput}
                  />
                  <Field
                    name="time"
                    time={true}
                    placeholder="Created"
                    value={idea.created}
                    component={DateInput}
                  />
                </Form.Group>
                <Field
                  name="updated"
                  placeholder="Updated"
                  date={true}
                  time={true}
                  value={idea.updated}
                  component={DateInput}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={
                    idea.id
                      ? () => history.push(`/ideas/${idea.id}`)
                      : () => history.push("/ideas")
                  }
                  disabled={loading || invalid || pristine}
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
