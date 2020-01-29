import React, { useEffect, useContext } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import IdeaStore from "../../../app/stores/ideaStore";

import IdeaList from "./IdeaList";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

const IdeaDashboard: React.FC = () => {
  const ideaStore = useContext(IdeaStore);

  useEffect(() => {
    ideaStore.loadIdeas();
  }, [ideaStore]);

  if (ideaStore.loadingInitial)
    return <LoadingComponent content="Loading Ideas..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <IdeaList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Idea filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(IdeaDashboard);
