import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { IIdea } from "../../../app/models/idea";

const IdeaDetailedInfo: React.FC<{ idea: IIdea }> = ({ idea }) => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{idea.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{idea.created}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="marker" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {"Zhitnitsa"}, {"Plovdiv"}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default IdeaDetailedInfo;
