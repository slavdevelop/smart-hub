import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  openCreateForm: () => void;
}

export const NavBar: React.FC<IProps> = ({ openCreateForm }) => {
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
          <Button onClick={openCreateForm} positive content="Give an Idea" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
