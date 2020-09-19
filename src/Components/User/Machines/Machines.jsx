import React, { useState, useEffect, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
//
import { CRMContext } from "../../../Context/CRMContext";
import YourMachines from "./YourMachines";
import clienteAxios from "../../../Config/axios";
import Swal from "sweetalert2";
import shortid from "shortid";
import jwt from "jsonwebtoken";

function Machines(props) {
  const [auth] = useContext(CRMContext);
  const [vm, setVm] = useState({});
  const [vms, guardarVms] = useState([]);

  const lookMachine = async () => {
    const currentUser = jwt.decode(auth.token);
    if (currentUser == null) {
      //props.history.push("/login");
    } else {
      await clienteAxios
        .get(`api/maquinas/usuario/${currentUser.nameid}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((resp) => {
          if (resp.status === 200) {
            guardarVms(resp.data);
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "warning",
            title: "Hubo un error",
            text: error,
          });
        });
    }
  };

  const configureMachine = (e) => {
    e.preventDefault();
    setVm({ ...vm, [e.target.name]: e.target.value });
  };

  const saveMachine = async (event) => {
    event.preventDefault();
    const { nombre, so, ram, vram, hdd, usuarioRdp, passRdp } = vm;
    let valido =
      !nombre || !so || !ram || !vram || !hdd || !usuarioRdp || !passRdp;
    if (valido) {
      Swal.fire({
        icon: "warning",
        text: "Todos los campos son obligatorios.",
      });
    } else {
      const currentUser = jwt.decode(auth.token);
      vm.usuarioId = parseInt(currentUser.nameid);
      vm.url = `${shortid.generate()}`;
      try {
        await clienteAxios
          .post("api/maquinas", vm, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          })
          .then((resp) => {
            lookMachine();
            Swal.fire(
              "Creación Exitosa!",
              "Estamos generando tu maquina virtual, esto puede tardar algunos minutos..",
              "success"
            );
          });
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: error,
        });
      }
    }
  };

  useEffect(() => {
    lookMachine(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!auth.token) {
    props.history.push("/login");
  }

  return (
    <div className="contenido">
      <div className="disf">
        <div className="suscripcion">
          <div className="disb">
            <div className="user_image">
              <img src="./user_male.png" alt="user_image" />
            </div>
            <div className="sub_info">
              <ul>
                <li>Suscripción: Free</li>
                <li>Capacidad: 1/2</li>
              </ul>
            </div>
            <div className="btn">
              <Link to="#">Ver Planes</Link>
            </div>
          </div>
        </div>
        <form className="crear_maquina" id="myForm">
          <div className="">
            <div>
              <label>Nombra tu maquina: </label>
              <input
                name="nombre"
                type="text"
                onChange={configureMachine}
              />
            </div>
            <div className="machine_props">
              <label>Sistema Operativo:</label>
              <select
                name="so"
                defaultValue="def"
                onChange={configureMachine}
              >
                <option disabled value="def">
                  -Seleccionar SO-
                </option>
                <option value="ubuntu">Ubuntu 18.04</option>
                <option value="debian">Debian 10</option>
              </select>
            </div>
            <div>
              <label>Memoria RAM:</label>
              <select
                name="ram"
                defaultValue="def"
                onChange={configureMachine}
              >
                <option value="def" disabled>
                  -Seleccionar RAM-
                </option>
                <option value="1024">1024 MB</option>
                <option value="2048">2048 MB</option>
                <option value="4096">4096 MB</option>
              </select>
            </div>
            <div>
              <label>Memoria VRAM:</label>
              <select
                name="vram"
                defaultValue="def"
                onChange={configureMachine}
              >
                <option value="def" disabled>
                  -Seleccionar VRAM-
                </option>
                <option value="16">16 MB</option>
                <option value="18">18 MB</option>
              </select>
            </div>
            <div>
              <label>Almacenamiento HDD:</label>
              <select
                name="hdd"
                defaultValue="def"
                onChange={configureMachine}
              >
                <option value="def" disabled>
                  -Seleccionar HDD-
                </option>
                <option value="10">10 GB</option>
                <option value="40">40 MB</option>
                <option value="70">70 MB</option>
              </select>
            </div>
          </div>
          <div>
            <div>
              <label>
                Nombre de Usuario: <i className="far fa-question-circle"></i>
              </label>
              <input
                name="usuarioRdp"
                type="text"
                onChange={configureMachine}
              />
            </div>
            <div>
              <label>
                Contraseña: <i className="far fa-eye"></i>
              </label>
              <input
                name="passRdp"
                type="password"
                onChange={configureMachine}
              />
            </div>
            <div>
              <button type="submit" onClick={saveMachine}>
                <i className="fas fa-plus-circle"></i> Crear
              </button>
            </div>
          </div>
        </form>
      </div>
      {!vms.length ? (
        <h4>Aun no tienes ninguna creada, cuando lo hagas apareceran aqui..</h4>
      ) : (
        vms.map((vm) => (
          <YourMachines key={vm.id} vms={vm} lookMachine={lookMachine} />
        ))
      )}
    </div>
  );
}

export default withRouter(Machines);
