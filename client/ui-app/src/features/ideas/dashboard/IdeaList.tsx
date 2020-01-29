import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import IdeaStore from "../../../app/stores/ideaStore";
import { IdeaListItem } from "./IdeaListItem";

const IdeaList: React.FC = () => {
  const ideaStore = useContext(IdeaStore);
  const { ideasByCreated } = ideaStore;

  return (
    <>
      {ideasByCreated.map(([group, ideas]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {group}
          </Label>
          <Item.Group divided>
            {ideas.map(idea => (
              <IdeaListItem key={idea.id} idea={idea} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </>
  );
};

export default observer(IdeaList);
