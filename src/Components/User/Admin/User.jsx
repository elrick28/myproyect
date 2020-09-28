import React, { useState } from "react";
import { Table, Image, Header, Button, Popup } from "semantic-ui-react";
import EditUser from "./EditUser";

const User = ({ user }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Table.Row>
        <Table.Cell>
          <Header as="h4" image inverted>
            <Image src="/userdefault.jpg" circular size="mini" />
            <Header.Content>
              {user.nombre}
              <Header.Subheader>{user.rol}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>
          <div className="btn-group">
            <Popup
              content="Modificar Usuario"
              trigger={
                <Button
                  color="yellow"
                  circular
                  icon="edit"
                  onClick={() => setOpen(true)}
                />
              }
            />
            <Popup
              content="Eliminar Usuario"
              trigger={<Button color="red" circular icon="trash" />}
            />
          </div>
        </Table.Cell>
      </Table.Row>
      <EditUser setOpen={setOpen} open={open} user={user} />
    </>
  );
};
export default User;
