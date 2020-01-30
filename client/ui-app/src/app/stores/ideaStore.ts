import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IIdea } from "../models/idea";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";

configure({ enforceActions: "always" });

class IdeaStore {
  @observable ideaRegistry = new Map();
  @observable idea: IIdea | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";

  @computed get ideasByCreated() {
    return this.groupIdeasByDate(Array.from(this.ideaRegistry.values()));
  }

  groupIdeasByDate(ideas: IIdea[]) {
    const sortedIdeas = ideas.sort(
      (a, b) => a.created.getTime() - b.created.getTime()
    );

    return Object.entries(
      sortedIdeas.reduce((ideas, idea) => {
        const date = idea.created.toISOString().split("T")[0];
        ideas[date] = ideas[date] ? [...ideas[date], idea] : [idea];

        return ideas;
      }, {} as { [key: string]: IIdea[] })
    );
  }

  @action loadIdeas = async () => {
    this.loadingInitial = true;

    try {
      const ideas = await agent.Ideas.list();
      runInAction("loading ideas", () => {
        ideas.forEach(idea => {
          idea.created = new Date(idea.created!);
          idea.updated = new Date(idea.updated!);
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
      return idea;
    } else {
      this.loadingInitial = true;

      try {
        idea = await agent.Ideas.details(id);

        runInAction("getting idea", () => {
          idea.created = new Date(idea.created);
          this.idea = idea;
          this.ideaRegistry.set(idea.id, idea);
          this.loadingInitial = false;
        });
        return idea;
      } catch (error) {
        runInAction("get idea error", () => {
          this.loadingInitial = false;
        });
        toast.error("Problem submitting data");
        console.log(error.response);
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

      history.push(`/ideas/${idea.id}`);
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

      history.push(`/ideas/${idea.id}`);
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
      throw error;
    }
  };
}

export default createContext(new IdeaStore());
