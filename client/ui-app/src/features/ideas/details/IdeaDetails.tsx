import React from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import { IIdea } from "../../../app/models/idea";

interface IProps {
  selectedIdea: IIdea | null;
}

export const IdeaDetails: React.FC<IProps> = ({ selectedIdea }) => {
  return (
    <Card fluid>
      <Image src="/assets/placeholder.png" wrapped ui={false} />
      {selectedIdea !== null && (
        <Card.Content>
          <Card.Header>{selectedIdea.title}</Card.Header>
          <Card.Meta>
            <span>{selectedIdea.created}</span>
            <span>{selectedIdea.updated}</span>
          </Card.Meta>
          <Card.Meta>{selectedIdea.category}</Card.Meta>
          <Card.Description>{selectedIdea.description}</Card.Description>
        </Card.Content>
      )}
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button basic color="blue" content="Edit" />
          <Button basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
