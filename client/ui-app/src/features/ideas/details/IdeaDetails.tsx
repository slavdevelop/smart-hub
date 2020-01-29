import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import IdeaStore from "../../../app/stores/ideaStore";

const IdeaDetails: React.FC = () => {
  const ideaStore = useContext(IdeaStore);
  const { selectedIdea: idea, openEditForm, cancelSelectedIdea } = ideaStore;

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${idea?.category}.jpg`}
        wrapped
        ui={false}
      />
      {idea !== null && (
        <Card.Content>
          <Card.Header>{idea!.title}</Card.Header>
          <Card.Meta>
            <span>{idea!.created}</span>
            <span>{idea!.updated}</span>
          </Card.Meta>
          <Card.Meta>{idea!.category}</Card.Meta>
          <Card.Description>{idea!.description}</Card.Description>
        </Card.Content>
      )}
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => openEditForm(idea!.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedIdea}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(IdeaDetails);
