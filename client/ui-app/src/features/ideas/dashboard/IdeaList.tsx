import React, { useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import IdeaStore from "../../../app/stores/ideaStore";

const IdeaList: React.FC = () => {
  const ideaStore = useContext(IdeaStore);
  const {
    ideasByCreated,
    selectIdea,
    deleteIdea,
    submitting,
    target
  } = ideaStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {ideasByCreated.map(idea => (
          <Item key={idea.id}>
            <Item.Content>
              <Item.Header as="a">{idea.title}</Item.Header>
              <Item.Meta>{idea.created}</Item.Meta>
              <Item.Meta>{idea.updated}</Item.Meta>
              <Item.Description>{idea.description}</Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectIdea(idea.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={idea.id}
                  loading={target === idea.id && submitting}
                  onClick={e => deleteIdea(e, idea.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={idea.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(IdeaList);
