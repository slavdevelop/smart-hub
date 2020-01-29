import React from "react";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";

import NavBar from "../../features/nav/NavBar";
import HomePage from "../../features/home/HomePage";
import IdeaDashboard from "../../features/ideas/dashboard/IdeaDashboard";
import IdeaForm from "../../features/ideas/form/IdeaForm";
import IdeaDetails from "../../features/ideas/details/IdeaDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/ideas" component={IdeaDashboard} />
              <Route path="/ideas/:id" component={IdeaDetails} />
              <Route
                key={location.key}
                path={["/newIdea", "/manage/:id"]}
                component={IdeaForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
};

export default withRouter(observer(App));
