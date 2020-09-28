import React from "react";
import { Grid, Item, Button, Image, Header } from "semantic-ui-react";
import UserCard from "./UserCard";

const UserProfile = () => {
  return (
    <div className="contenedor">
      <Header as="h2" icon textAlign="center" inverted>
        <Image src="/userdefault.jpg" circular size="massive" />
        <Header.Content>name</Header.Content>
      </Header>
    </div>
  );
};

export default UserProfile;
