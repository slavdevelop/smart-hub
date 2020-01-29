import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import IdeaStore from "../../app/stores/ideaStore";

const NavBar: React.FC = () => {
  const ideaStore = useContext(IdeaStore);

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.jpg"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Smart Hub
        </Menu.Item>
        <Menu.Item name="Ideas" />
        <Menu.Item>
          <Button
            onClick={ideaStore.openCreateForm}
            positive
            content="Give an Idea"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
