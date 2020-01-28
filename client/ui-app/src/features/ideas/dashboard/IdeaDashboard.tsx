import React from "react";
import { Grid } from "semantic-ui-react";
import { IIdea } from "../../../app/models/idea";
import { IdeaList } from "./IdeaList";
import { IdeaDetails } from "../details/IdeaDetails";
import { IdeaForm } from "../form/IdeaForm";

interface IProps {
  ideas: IIdea[];
  selectIdea: (id: string) => void;
  selectedIdea: IIdea | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedIdea: (idea: IIdea | null) => void;
  createIdea: (idea: IIdea) => void;
  editIdea: (idea: IIdea) => void;
  deleteIdea: (id: string) => void;
}

export const IdeaDashboard: React.FC<IProps> = ({
  ideas,
  selectIdea,
  selectedIdea,
  editMode,
  setEditMode,
  setSelectedIdea,
  createIdea,
  editIdea,
  deleteIdea
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <IdeaList
          ideas={ideas}
          selectIdea={selectIdea}
          deleteIdea={deleteIdea}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedIdea && !editMode && (
          <IdeaDetails
            idea={selectedIdea}
            setEditMode={setEditMode}
            setSelectedIdea={setSelectedIdea}
          />
        )}
        {editMode && (
          <IdeaForm
            key={(selectedIdea && selectedIdea.id) || 0}
            setEditMode={setEditMode}
            idea={selectedIdea!}
            createIdea={createIdea}
            editIdea={editIdea}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
