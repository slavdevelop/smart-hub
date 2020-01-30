export interface IIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  created: Date;
  updated: Date;
}

export interface IIdeaFormValues extends Partial<IIdea> {
  time?: Date;
}

export class IdeaFormValues implements IIdeaFormValues {
  id?: string = undefined;
  title: string = "";
  category: string = "";
  description: string = "";
  created?: Date = undefined;
  time?: Date = undefined;
  updated?: Date = undefined;

  constructor(init?: IIdeaFormValues) {
    if (init && init.created) {
      init.time = init.created;
    }
    Object.assign(this, init);
  }
}
