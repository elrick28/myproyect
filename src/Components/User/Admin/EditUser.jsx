import React from "react";
import {
  Image,
  Form,
  Button,
  Modal,
  Icon,
  Input
} from "semantic-ui-react";

const EditUser = ({ setOpen, open, user }) => {
  const rol_options = [
    { key: "1", text: "Admin", value: "admin" },
    { key: "2", text: "Usuario", value: "usuario" },
  ];

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Datos del usuario</Modal.Header>
      <Modal.Content image>
        <Image size="medium" src="/userdefault.jpg" wrapped />
        <Modal.Description>
          <Form>
            <Form.Field>
              <h4>
                <Icon name="user" /> Nombre de Usuario
              </h4>
              <Input
                className="centrar"
                placeholder="ejemplo@email.com"
                name="email"
                value={user.nombre}
              ></Input>
            </Form.Field>
            <Form.Field>
              <h4>
                <Icon name="mail" /> Email
              </h4>
              <Input
                className="centrar"
                placeholder="ejemplo@email.com"
                name="email"
                value={user.email}
              ></Input>
            </Form.Field>
            <Form.Field>
              <h4>
                <Icon name="spy" /> Rol
              </h4>
              <Form.Select options={rol_options} defaultValue={user.role} />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button size="large" color="red" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button positive size="large" onClick={() => setOpen(false)}>
          <Icon name="save" /> Actualizar
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditUser;
