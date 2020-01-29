import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Smart Hub
        </Menu.Item>
        <Menu.Item name="Ideas" as={NavLink} to="/ideas" />
        <Menu.Item>
          <Button as={NavLink} to="/newIdea" positive content="New Idea" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
