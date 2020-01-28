import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IIdea } from "../../../app/models/idea";

interface IProps {
  idea: IIdea | null;
  setEditMode: (editMode: boolean) => void;
  setSelectedIdea: (idea: IIdea | null) => void;
}

export const IdeaDetails: React.FC<IProps> = ({
  idea,
  setEditMode,
  setSelectedIdea
}) => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${idea?.category}.jpg`}
        wrapped
        ui={false}
      />
      {idea !== null && (
        <Card.Content>
          <Card.Header>{idea.title}</Card.Header>
          <Card.Meta>
            <span>{idea.created}</span>
            <span>{idea.updated}</span>
          </Card.Meta>
          <Card.Meta>{idea.category}</Card.Meta>
          <Card.Description>{idea.description}</Card.Description>
        </Card.Content>
      )}
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => setSelectedIdea(null)}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
