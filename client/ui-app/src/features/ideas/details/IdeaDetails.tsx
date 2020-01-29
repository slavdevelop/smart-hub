import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import IdeaStore from "../../../app/stores/ideaStore";
import { RouteComponentProps, Link } from "react-router-dom";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

interface DetailParams {
  id: string;
}

const IdeaDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const ideaStore = useContext(IdeaStore);
  const { idea, loadIdea, loadingInitial } = ideaStore;

  useEffect(() => {
    loadIdea(match.params.id);
  }, [loadIdea, match.params.id]);

  if (loadingInitial || !idea)
    return <LoadingComponent content="Loading idea..." />;

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
            as={Link}
            to={`/manage/${idea.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push("/ideas")}
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
