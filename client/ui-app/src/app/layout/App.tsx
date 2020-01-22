import React, { useState, useEffect } from "react";
import { Header, Icon, List, Container } from "semantic-ui-react";
import axios from "axios";

import { IIdea } from "../models/idea";
import { NavBar } from "../../features/nav/NavBar";
import { IdeaDashboard } from "../../features/ideas/dashboard/IdeaDashboard";

const App: React.FC = () => {
  const [ideas, setIdeas] = useState<IIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<IIdea | null>(null);

  const handleSelectIdea = (id: string) => {
    setSelectedIdea(ideas.filter(i => i.id === id)[0]);
  };

  useEffect(() => {
    axios
      .get<IIdea[]>("http://localhost:5000/api/ideas")
      .then(response => setIdeas(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <IdeaDashboard
          ideas={ideas}
          selectIdea={handleSelectIdea}
          selectedIdea={selectedIdea}
        />
      </Container>
    </>
  );
};

export default App;
