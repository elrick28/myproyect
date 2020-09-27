import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { CRMContext } from "../../../Context/CRMContext";
import clienteAxios from "../../../Config/axios";
import Swal from "sweetalert2";
import { Form, Icon, Input, Popup, Button } from "semantic-ui-react";

const EditMachine = (props) => {
  const [auth] = useContext(CRMContext);
  const { vmId } = props.match.params;
  const [vm, setVm] = useState({});
  const [newVm, setNewVm] = useState({});
  const options_so = [
    { key: "1", text: "Ubuntu 18.20", value: "ubuntu" },
    { key: "2", text: "Debian 10", value: "debian" },
  ];
  const options_hdd = [
    { key: "1", text: "10 GB", value: "10" },
    { key: "2", text: "40 GB", value: "40" },
  ];
  const options_ram = [
    { key: "1", text: "1000 MB", value: "1000" },
    { key: "2", text: "2000 MB", value: "2000" },
  ];
  const options_vram = [
    { key: "1", text: "16 MB", value: "16" },
    { key: "2", text: "18 MB", value: "18" },
  ];
  const validarForm = () => {
    const { nombre, so, ram, vram, hdd, usuarioRdp, passRdp } = vm;
    const valido =
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
        if (error.response.status === 404) {
          props.history.push("/machines");
        }
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
        if (error.response.status === 500) {
          props.history.push("/machines");
        }
      });
  };

  useEffect(() => {
    searchMachine(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="contenedor">
      <Form className="form-content">
        <Form.Group widths="equal">
          <Form.Field className="fix-options">
            <label>Nombra tu maquina: </label>
            <Input
              name="nombre"
              type="text"
              defaultValue={vm.nombre}
              onChange={configureMachine}
            />
          </Form.Field>
          <Form.Field>
            <label>Sistema Operativo:</label>
            <Form.Select
              name="so"
              className="fix-options"
              options={options_so}
              placeholder="Windows.."
              onChange={configureMachine}
              defaultValue={vm.so}
            />
          </Form.Field>
          <Form.Field>
            <label>Almacenamiento HDD:</label>
            <Form.Select
              name="hdd"
              className="fix-options"
              options={options_hdd}
              placeholder="GB"
              onChange={configureMachine}
              defaultValue={vm.hdd}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Memoria Ram:</label>
            <Form.Select
              name="ram"
              className="fix-options"
              placeholder="MB"
              onChange={configureMachine}
              options={options_ram}
              defaultValue={vm.ram}
            ></Form.Select>
          </Form.Field>
          <Form.Field>
            <label>Memoria VRam:</label>
            <Form.Select
              name="vram"
              className="fix-options"
              placeholder="MB"
              options={options_vram}
              onChange={configureMachine}
              defaultValue={vm.vram}
            ></Form.Select>
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal" className="fix-icons">
          <Form.Field>
            <Popup
              className="fix-options"
              content="Usuario para protocolo de conexión RDP"
              trigger={
                <div>
                  <label>Nombre de Usuario: </label>
                  <Icon inverted size="large" name="info circle" />
                </div>
              }
            />
            <Input
              defaultValue={vm.usuarioRdp}
              name="usuarioRdp"
              type="text"
              onChange={configureMachine}
            />
          </Form.Field>
          <Form.Field>
            <Popup
              className="fix-options"
              content="Contraseña para acceder por medio del protocolo de conexión RDP"
              trigger={
                <div>
                  <label>Contraseña: </label>
                  <Icon inverted size="large" name="eye" />
                </div>
              }
            />
            <Input
              defaultValue={vm.passRdp}
              name="passRdp"
              type="password"
              onChange={configureMachine}
            />
          </Form.Field>
        </Form.Group>
        <Button
          size="huge"
          fluid
          color="blue"
          onClick={updateMachine}
          disabled={validarForm()}
        >
          <Icon name="save" /> Actualizar
        </Button>
      </Form>
    </div>
  );
};

export default withRouter(EditMachine);
