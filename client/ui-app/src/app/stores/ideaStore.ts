import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IIdea } from "../models/idea";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class IdeaStore {
  @observable ideaRegistry = new Map();
  @observable idea: IIdea | null = null;
  @observable loadingInitial = false;
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

  @action loadIdea = async (id: string) => {
    let idea = this.getIdea(id);

    if (idea) {
      this.idea = idea;
    } else {
      this.loadingInitial = true;

      try {
        idea = await agent.Ideas.details(id);

        runInAction("getting idea", () => {
          this.idea = idea;
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction("get idea error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearIdea = () => {
    this.idea = null;
  };

  getIdea = (id: string) => this.ideaRegistry.get(id);

  @action createIdea = async (idea: IIdea) => {
    this.submitting = true;

    try {
      await agent.Ideas.create(idea);
      runInAction("creating idea", () => {
        this.ideaRegistry.set(idea.id, idea);
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
        this.idea = idea;
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
}

export default createContext(new IdeaStore());
