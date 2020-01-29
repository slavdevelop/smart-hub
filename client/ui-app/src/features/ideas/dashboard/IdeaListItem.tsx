import React from "react";
import { Button, Item, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { IIdea } from "../../../app/models/idea";

export const IdeaListItem: React.FC<{ idea: IIdea }> = ({ idea }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a">{idea.title}</Item.Header>
              <Item.Meta>{idea.created}</Item.Meta>
              <Item.Description>
                Hosted by <b>Slav</b>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" /> {idea.created}
        <Icon name="marker" /> Zhitnitsa, Plovdiv
      </Segment>
      <Segment secondary>Attendes will go here</Segment>
      <Segment clearing>
        <span>{idea.description}</span>
        <Button
          as={Link}
          to={`/ideas/${idea.id}`}
          floated="right"
          content="View"
          color="blue"
        />
      </Segment>
    </Segment.Group>
  );
};
