import React from "react";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { IIdea } from "../../../app/models/idea";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const ideaImageStyle = {
  filter: "brightness(30%)"
};

const ideaImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

const IdeaDetailedHeader: React.FC<{ idea: IIdea }> = ({ idea }) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${idea.category}.jpg`}
          fluid
          style={ideaImageStyle}
        />
        <Segment basic style={ideaImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={"Title"}
                  style={{ color: "white" }}
                />
                <p>Date</p>
                <p>
                  Hosted by <strong>Slav</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Share Idea</Button>
        <Button>Cancel support</Button>
        <Button
          as={Link}
          to={`/manage/${idea.id}`}
          color="orange"
          floated="right"
        >
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(IdeaDetailedHeader);
