import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import IdeaList from "./IdeaList";
import IdeaDetails from "../details/IdeaDetails";
import IdeaForm from "../form/IdeaForm";

import IdeaStore from "../../../app/stores/ideaStore";

const IdeaDashboard: React.FC = () => {
  const ideaStore = useContext(IdeaStore);
  const { editMode, selectedIdea } = ideaStore;

  return (
    <Grid>
      <Grid.Column width={10}>
        <IdeaList />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedIdea && !editMode && <IdeaDetails />}
        {editMode && (
          <IdeaForm
            key={(selectedIdea && selectedIdea.id) || 0}
            idea={selectedIdea!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(IdeaDashboard);
