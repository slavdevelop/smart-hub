import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import IdeaStore from "../../../app/stores/ideaStore";
import { RouteComponentProps } from "react-router-dom";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import IdeaDetailedHeader from "./IdeaDetailedHeader";
import IdeaDetailedInfo from "./IdeaDetailedInfo";
import IdeaDetailedChat from "./IdeaDetailedChat";
import IdeaDetailedSidebar from "./IdeaDetailedSidebar";

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
  }, [loadIdea, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content="Loading idea..." />;

  if (!idea) return <h2>Idea not found!</h2>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <IdeaDetailedHeader idea={idea} />
        <IdeaDetailedInfo idea={idea} />
        <IdeaDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <IdeaDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(IdeaDetails);
