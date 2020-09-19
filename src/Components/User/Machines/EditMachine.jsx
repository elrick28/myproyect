import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { CRMContext } from "../../../Context/CRMContext";
import clienteAxios from "../../../Config/axios";
import Swal from "sweetalert2";

const EditMachine = (props) => {
  const [auth] = useContext(CRMContext);
  const { vmId } = props.match.params;
  const [vm, setVm] = useState({});
  const [newVm, setNewVm] = useState({});

  const validarForm = () => {
    const { nombre, so, ram, vram, hdd, usuarioRdp, passRdp } = vm;
    let valido =
      !nombre || !so || !ram || !vram || !hdd || !usuarioRdp || !passRdp;
    return valido;
  };

  const configureMachine = (event) => {
    event.preventDefault();
    setNewVm({ ...vm, [event.target.name]: event.target.value });
  };

  const searchMachine = async () => {
    await clienteAxios
      .get(`api/maquinas/${vmId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((resp) => {
        setVm(resp.data);
      })
      .catch((error) => {
        if(error.response.data.status === 404) { props.history.push("/machines") }
      });
  };

  const updateMachine = async (event) => {
    event.preventDefault();
    const id = parseInt(vmId);
    newVm.id = id;
    await clienteAxios
      .put(`api/maquinas/${id}`, newVm, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then(() => {
        Swal.fire({
          position: "bottom-start",
          icon: "success",
          text: "Maquina virtual actualizada.",
          showConfirmButton: false,
          timer: 1500,
        });
        props.history.push("/machines");
      })
      .catch((error) => {
        props.history.push("/machines");
      });
  };

  useEffect(() => {
    searchMachine(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="contenido">
      <div className="">
        <form className="crear_maquina">
          <div className="">
            <div>
              <label>Nombra tu maquina: </label>
              <input
                name="nombre"
                type="text"
                defaultValue={vm.nombre}
                onChange={configureMachine}
              />
            </div>
            <div className="machine_props">
              <label>Sistema Operativo:</label>
              <select name="so" onChange={configureMachine} value={vm.so}>
                <option disabled value="def">
                  -Seleccionar SO-
                </option>
                <option value="ubuntu">Ubuntu 18.04</option>
                <option value="debian">Debian 10</option>
              </select>
            </div>
            <div>
              <label>Memoria RAM:</label>
              <select name="ram" value={vm.ram} onChange={configureMachine}>
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
              <select name="vram" value={vm.vram} onChange={configureMachine}>
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
                defaultValue={vm.hdd}
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
                defaultValue={vm.usuarioRdp}
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
                defaultValue={vm.passRdp}
                onChange={(event) => configureMachine(event)}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={validarForm()}
                onClick={updateMachine}
              >
                <i className="fas fa-save"></i> Actualizar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(EditMachine);
