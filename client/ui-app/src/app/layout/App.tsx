import React, { useState, useEffect, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";

import { IIdea } from "../models/idea";
import { NavBar } from "../../features/nav/NavBar";
import { IdeaDashboard } from "../../features/ideas/dashboard/IdeaDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";

const App: React.FC = () => {
  const [ideas, setIdeas] = useState<IIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<IIdea | null>(null);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleSelectIdea = (id: string) => {
    setSelectedIdea(ideas.filter(i => i.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedIdea(null);
    setEditMode(true);
  };

  const handleCreateIdea = (idea: IIdea) => {
    setSubmitting(true);
    agent.Ideas.create(idea)
      .then(() => {
        setIdeas([...ideas, idea]);
        setSelectedIdea(idea);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditIdea = (idea: IIdea) => {
    setSubmitting(true);

    agent.Ideas.update(idea)
      .then(() => {
        setIdeas([...ideas.filter(i => i.id !== idea.id), idea]);
        setSelectedIdea(idea);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeleteIdea = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);

    agent.Ideas.delete(id)
      .then(() => {
        setIdeas([...ideas.filter(i => i.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    agent.Ideas.list()
      .then(response => {
        let ideas: IIdea[] = [];

        response.forEach(idea => {
          idea.created = idea.created.split(".")[0];
          idea.updated = idea.updated.split(".")[0];
          ideas.push(idea);
        });

        setIdeas(ideas);
      })
      .then(() => setLoading(false))
      .catch(error => console.log(error));
  }, []);

  if (loading) return <LoadingComponent content="Loading Ideas..." />;

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
          submitting={submitting}
          target={target}
        />
      </Container>
    </>
  );
};

export default App;
