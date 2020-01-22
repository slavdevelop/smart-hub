import React from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IIdea } from "../../../app/models/idea";

interface IProps {
  ideas: IIdea[];
  selectIdea: (id: string) => void;
}

export const IdeaList: React.FC<IProps> = ({ ideas, selectIdea }) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {ideas.map(idea => (
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
                <Label basic content={idea.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
