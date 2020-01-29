import React, { useEffect, useContext } from "react";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import NavBar from "../../features/nav/NavBar";
import IdeaDashboard from "../../features/ideas/dashboard/IdeaDashboard";
import { LoadingComponent } from "./LoadingComponent";

import IdeaStore from "../stores/ideaStore";

const App: React.FC = () => {
  const ideaStore = useContext(IdeaStore);

  useEffect(() => {
    ideaStore.loadIdeas();
  }, [ideaStore]);

  if (ideaStore.loadingInitial)
    return <LoadingComponent content="Loading Ideas..." />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <IdeaDashboard />
      </Container>
    </>
  );
};

export default observer(App);
