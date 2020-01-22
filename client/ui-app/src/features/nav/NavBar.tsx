import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

export const NavBar = () => {
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
          <Button positive content="Give an Idea" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
