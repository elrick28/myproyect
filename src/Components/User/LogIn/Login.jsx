import React, { useState, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../../Config/axios";
import { CRMContext } from "../../../Context/CRMContext";
import { Input, Button, Icon, Form, Header } from "semantic-ui-react";

const Login = ({ history }) => {
  const [auth, guardarToken] = useContext(CRMContext);
  const [usuario, guardarUsuario] = useState({});

  const leerDatos = (e,data) => {
    guardarUsuario({
      ...usuario,
      [data.name]: data.value,
    });
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

  const iniciarSesion = async (e) => {
    e.preventDefault();
    const { email, pass } = usuario;
    if (!email || !pass) {
      Swal.fire({
        icon: "warning",
        text: "Todos los campos son obligatorios.",
      });
    } else if (!validarEmail(email)) {
      Swal.fire({
        icon: "warning",
        text: "Email no valido, intenta de nuevo",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await clienteAxios
        .post("api/usuarios/login", usuario, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((resp) => {
          if (resp.status === 200) {
            const { token } = resp.data;
            localStorage.setItem("token", token);
            guardarToken({
              token,
              auth: true,
            });
            history.push("/machines");
            Swal.fire({
              position: "bottom-start",
              icon: "success",
              text: `Bienvenido, ${resp.data.nombre}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            Swal.fire({
              icon: "info",
              text: error.response.data,
              showConfirmButton: false,
              timer: 1500,
            });
          } else if (error.response.status === 401) {
            Swal.fire({
              icon: "error",
              text: error.response.data,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };

  return (
    <div className="contenedor">
      <Form className="fix-color-form">
        <Header as="h2" icon textAlign="center">
          <Icon name="user" circular />
          <Header.Content>Inicia Sesión</Header.Content>
        </Header>
        <div className="centrar space">
          <Form.Field width={4}>
            <h4>
              <Icon name="mail" /> Email
            </h4>
            <Input
              className="centrar"
              type="email"
              placeholder="ejemplo@email.com"
              name="email"
              onChange={leerDatos}
            ></Input>
          </Form.Field>
        </div>
        <div className="centrar space">
          <Form.Field width={4}>
            <h4>
              <Icon name="lock" /> Contraseña
            </h4>
            <Input
              className="centrar"
              type="password"
              placeholder="******"
              name="pass"
              onChange={leerDatos}
            ></Input>
          </Form.Field>
        </div>
        <div className="centrar spaace">
          <Button size="large" className="centrar" positive onClick={iniciarSesion}>
            Iniciar Sesión
          </Button>
        </div>
        <Header as="h4" className="centrar space">
          <Link to="/signin">¿No tienes cuenta?, Crea una!</Link>
        </Header>
      </Form>
    </div>
  );
};

export default withRouter(Login);
