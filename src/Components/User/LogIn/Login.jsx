import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../../Config/axios";
import { CRMContext } from "../../../Context/CRMContext";

const Login = ({ history }) => {
  const [auth, guardarToken] = useContext(CRMContext);
  const [usuario, guardarUsuario] = useState({});

  const leerDatos = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();
    const { email, pass } = usuario;
    if (!email || !pass) {
      Swal.fire({
        icon: "warning",
        text: "Todos los campos son obligatorios.",
      });
    } else {
      await clienteAxios
        .post("api/usuarios/login", usuario, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((resp) => {
          console.log(resp);
          if (resp.status === 200) {
            const { token } = resp.data;
            localStorage.setItem("token", token);
            guardarToken({
              token,
              auth: true,
            });
            history.push("/machines");
          }
        })
        .catch((error) => {
          const { StatusCode, Message } = error.response.data;
          if (StatusCode === 404) {
            Swal.fire({
              icon: "info",
              text: Message,
              showConfirmButton: false,
              timer: 1500,
            });
          } else if (StatusCode === 401) {
            Swal.fire({
              icon: "error",
              text: "Contraseña incorrecta.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };

  return (
    <div className="contenido disf">
      <div className="login">
        <form>
          <i className="fas fa-user-circle especial"></i>
          <div>
            <h4>
              <i className="far fa-envelope"></i> Email
            </h4>
            <input type="text" name="email" onChange={leerDatos}></input>
          </div>
          <div>
            <h4>
              <i className="fas fa-lock"></i> Contraseña
            </h4>
            <input type="password" name="pass" onChange={leerDatos}></input>
          </div>
          <div className="btn-login" onClick={iniciarSesion}>
            Iniciar Sesión
          </div>
          <div className="retorno">
            <Link to={"/signin"}>Registrarse</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
