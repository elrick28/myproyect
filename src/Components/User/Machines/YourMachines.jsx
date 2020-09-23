import React, { useContext, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { CRMContext } from "../../../Context/CRMContext";
import Swal from "sweetalert2";
import clienteAxios from "../../../Config/axios";
import Aos from "aos";

const YourMachines = ({ vms, lookMachine }) => {
  const [auth] = useContext(CRMContext);

  const deleteMachine = async (event) => {
    event.preventDefault();
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras recuperar esta maquina virtual!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        clienteAxios
          .delete(`api/maquinas/${vms.id}`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          })
          .then((resp) => {
            lookMachine();
            Swal.fire(
              "Eliminado!",
              "Tu maquina virtual ha sido eliminada.",
              "success"
            );
          });
      }
    });
  };

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <div className="maquinas_b" data-aos="zoom-in-up">
      <div className="maquinas">
        <div className="so">
          <img src="./windows.png" alt="logo_so" />
          <h4>SO: {vms.so}</h4>
        </div>
        <div className="m_espec">
          <div className="d_info">
            <h4>
              Nombre: <span>{vms.nombre}</span>
            </h4>
            <h4>
              Ram: <span>{vms.ram} MB</span>
            </h4>
            <h4>
              VRam: <span>{vms.vram} MB</span>
            </h4>
            <h4>
              HDD: <span>{vms.hdd} GB</span>
            </h4>
          </div>
          <div>
            <h4>
              Usuario: <span>{vms.usuarioRdp}</span>
            </h4>
            <h4>
              Contraseña: <span>{vms.passRdp}</span>
            </h4>
          </div>
        </div>
      </div>
      <div className="btn-group">
        {!vms.state ? (
          <button className="btn-start">
            <i className="far fa-play-circle" /> Iniciar
          </button>
        ) : (
          <button className="btn-apagar">
            <i className="fas fa-power-off" /> Apagar
          </button>
        )}
        <Link className="btn-editar" to={`machines/editar/${vms.id}`}>
          <i className="far fa-edit" /> Editar
        </Link>
        <button className="btn-apagar" onClick={deleteMachine}>
          <i className="fas fa-power-off" /> Eliminar
        </button>
      </div>
    </div>
  );
};
export default withRouter(YourMachines);
