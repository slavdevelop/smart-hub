import React from "react";
import { Grid, List } from "semantic-ui-react";
import { IIdea } from "../../../app/models/idea";
import { IdeaList } from "./IdeaList";
import { IdeaDetails } from "../details/IdeaDetails";
import { IdeaForm } from "../form/IdeaForm";

interface IProps {
  ideas: IIdea[];
  selectIdea: (id: string) => void;
  selectedIdea: IIdea | null;
}

export const IdeaDashboard: React.FC<IProps> = ({
  ideas,
  selectIdea,
  selectedIdea
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <IdeaList ideas={ideas} selectIdea={selectIdea} />
      </Grid.Column>
      <Grid.Column width={6}>
        <IdeaDetails selectedIdea={selectedIdea} />
        <IdeaForm />
      </Grid.Column>
    </Grid>
  );
};
