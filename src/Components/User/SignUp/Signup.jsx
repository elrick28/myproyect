import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import clienteAxios from "../../../Config/axios";
import Swal from "sweetalert2";

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
            .catch(() => {
              Swal.fire({
                icon: "error",
                title: "Hubo un error",
                text: "Este usuario ya se encuentra registrado.",
              });
            });
        }
      }
    }
  };

  return (
    <div className="contenido disf">
      <div className="login">
        <form>
          <div className="disb">
            <i className="fas fa-users especial"></i>
            <h2>Unete a la comunidad!</h2>
          </div>
          <div>
            <h4>
              <i className="fas fa-user"></i> Nombre de usuario
            </h4>
            <input
              type="text"
              name="nombre"
              onChange={(e) => configurarUsuario(e)}
            />
          </div>
          <div>
            <h4>
              <i className="far fa-envelope"></i> Email
            </h4>
            <input
              type="email"
              name="email"
              onChange={(e) => configurarUsuario(e)}
            />
          </div>
          <div>
            <h4>
              <i className="fas fa-unlock"></i> Contraseña
            </h4>
            <input
              type="password"
              name="pass"
              onChange={(e) => configurarUsuario(e)}
            />
          </div>
          <div>
            <h4>
              <i className="fas fa-lock"></i> Repetir Contraseña
            </h4>
            <input
              type="password"
              name="repeatpass"
              onChange={(e) => configurarUsuario(e)}
            />
          </div>
          <div className="btn-login" onClick={registarUsuario}>
            Crear Cuenta
          </div>
          <div className="retorno">
            <Link to={"/login"}>¿Ya tienes cuenta?, Inicia sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Signup);
