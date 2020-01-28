import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";

import { IIdea } from "../models/idea";
import { NavBar } from "../../features/nav/NavBar";
import { IdeaDashboard } from "../../features/ideas/dashboard/IdeaDashboard";

const App: React.FC = () => {
  const [ideas, setIdeas] = useState<IIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<IIdea | null>(null);

  const [editMode, setEditMode] = useState(false);

  const handleSelectIdea = (id: string) => {
    setSelectedIdea(ideas.filter(i => i.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedIdea(null);
    setEditMode(true);
  };

  const handleCreateIdea = (idea: IIdea) => {
    setIdeas([...ideas, idea]);
    setSelectedIdea(idea);
    setEditMode(false);
  };

  const handleEditIdea = (idea: IIdea) => {
    setIdeas([...ideas.filter(i => i.id !== idea.id), idea]);
    setSelectedIdea(idea);
    setEditMode(false);
  };

  const handleDeleteIdea = (id: string) => {
    setIdeas([...ideas.filter(i => i.id !== id)]);
  };

  useEffect(() => {
    axios
      .get<IIdea[]>("http://localhost:5000/api/ideas")
      .then(response => {
        let ideas: IIdea[] = [];

        response.data.forEach(idea => {
          idea.created = idea.created.split(".")[0];
          idea.updated = idea.updated.split(".")[0];
          ideas.push(idea);
        });

        setIdeas(ideas);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <IdeaDashboard
          ideas={ideas}
          selectIdea={handleSelectIdea}
          selectedIdea={selectedIdea}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedIdea={setSelectedIdea}
          createIdea={handleCreateIdea}
          editIdea={handleEditIdea}
          deleteIdea={handleDeleteIdea}
        />
      </Container>
    </>
  );
};

export default App;
