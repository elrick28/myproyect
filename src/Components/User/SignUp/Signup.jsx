import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import clienteAxios from "../../../Config/axios";
import Swal from "sweetalert2";
import { Input, Button, Icon, Form, Header } from "semantic-ui-react";

const Signup = (props) => {
  const [newUser, setNewUser] = useState({});

  const configurarUsuario = (e) => {
    e.preventDefault();
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  function validarEmail(email) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      //alert("La dirección de email " + valor + " es correcta.");
      return false;
    } else {
      //alert("La dirección de email es incorrecta.");
      return true;
    }
  }

  const registarUsuario = async (e) => {
    e.preventDefault();
    const { nombre, email, pass, repeatpass } = newUser;
    if (!nombre || !email || !pass || !repeatpass) {
      Swal.fire({
        icon: "warning",
        text: "Todos los campos son obligatorios.",
      });
    } else {
      const valido = validarEmail(newUser.email);
      if (!valido) {
        Swal.fire({
          icon: "warning",
          title: "Email no valido",
          text: "El email ingresado es incorrecto, intenta nuevamente.",
        });
      } else {
        if (newUser.pass !== newUser.repeatpass) {
          Swal.fire({
            icon: "warning",
            title: "Contraseña Incorrecta",
            text: "Las contraseñas no coinciden, vuelte a intentarlo.",
          });
        } else {
          await clienteAxios
            .post("api/usuarios", newUser)
            .then((resp) => {
              if (resp.status === 201) {
                Swal.fire({
                  icon: "success",
                  title: "Usuario Registrado",
                  text: "Tu usuario ha sido creado con exito.",
                });
                props.history.push("/login");
              }
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                text: error.response.data,
              });
            });
        }
      }
    }
  };

  return (
    <div className="contenedor">
      <Form className="fix-color-form">
        <Header as="h2" icon textAlign="center">
          <Icon name="users" circular />
          <Header.Content>Unete a la comunidad!</Header.Content>
        </Header>
        <div className="centrar space">
          <Form.Field width={4}>
            <Header as="h4">
              <Icon name="user" />
              <Header.Content>Nombre de usuario</Header.Content>
            </Header>
            <Input
              type="text"
              name="nombre"
              onChange={(e) => configurarUsuario(e)}
            />
          </Form.Field>
        </div>
        <div className="centrar space">
          <Form.Field width={4}>
            <Header as="h4">
              <Icon name="mail" />
              <Header.Content>Email</Header.Content>
            </Header>
            <input
              type="email"
              name="email"
              onChange={(e) => configurarUsuario(e)}
            />
          </Form.Field>
        </div>
        <div className="centrar space">
          <Form.Field width={4}>
            <Header as="h4">
              <Icon name="unlock" />
              <Header.Content>Contraseña</Header.Content>
            </Header>
            <Input
              type="password"
              name="pass"
              onChange={(e) => configurarUsuario(e)}
            />
          </Form.Field>
        </div>
        <div className="centrar space">
          <Form.Field width={4}>
            <Header as="h4">
              <Icon name="lock" />
              <Header.Content>Repetir Contraseña</Header.Content>
            </Header>
            <Input
              type="password"
              name="repeatpass"
              onChange={(e) => configurarUsuario(e)}
            />
          </Form.Field>
        </div>
        <div className="centrar space">
          <Button size="large" positive onClick={registarUsuario}>
            Crear Cuenta
          </Button>
        </div>
        <Header as="h4" className="centrar space">
          <Link to="/login">¿Ya tienes cuenta?, Inicia sesión!</Link>
        </Header>
      </Form>
    </div>
  );
};

export default withRouter(Signup);
