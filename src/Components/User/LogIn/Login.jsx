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
    <div className="contenido disf">
      <div className="login">
        <form>
          <i className="fas fa-user-circle especial"></i>
          <div>
            <h4>
              <i className="far fa-envelope"></i> Email
            </h4>
            <input type="email" name="email" onChange={leerDatos}></input>
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
