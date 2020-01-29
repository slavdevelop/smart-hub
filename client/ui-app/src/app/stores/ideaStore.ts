import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IIdea } from "../models/idea";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class IdeaStore {
  @observable ideaRegistry = new Map();
  @observable ideas: IIdea[] = [];
  @observable selectedIdea: IIdea | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";

  @computed get ideasByCreated() {
    return Array.from(this.ideaRegistry.values()).sort(
      (a, b) => Date.parse(a.created) - Date.parse(b.created)
    );
  }

  @action loadIdeas = async () => {
    this.loadingInitial = true;

    try {
      const ideas = await agent.Ideas.list();
      runInAction("loading ideas", () => {
        ideas.forEach(idea => {
          idea.created = idea.created.split(".")[0];
          idea.updated = idea.updated.split(".")[0];
          this.ideaRegistry.set(idea.id, idea);
        });

        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load ideas error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action createIdea = async (idea: IIdea) => {
    this.submitting = true;

    try {
      await agent.Ideas.create(idea);
      runInAction("creating idea", () => {
        this.ideaRegistry.set(idea.id, idea);
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("create idea error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action editIdea = async (idea: IIdea) => {
    this.submitting = true;

    try {
      await agent.Ideas.update(idea);
      runInAction("editing idea", () => {
        this.ideaRegistry.set(idea.id, idea);
        this.selectedIdea = idea;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("edit idea error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteIdea = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;

    try {
      await agent.Ideas.delete(id);
      runInAction("deleting idea", () => {
        this.ideaRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete idea error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedIdea = undefined;
  };

  @action openEditForm = (id: string) => {
    this.selectedIdea = this.ideaRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedIdea = () => {
    this.selectedIdea = undefined;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action selectIdea = (id: string) => {
    this.selectedIdea = this.ideaRegistry.get(id);
    this.editMode = false;
  };
}

export default createContext(new IdeaStore());
