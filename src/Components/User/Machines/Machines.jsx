import React, { useState, useEffect, useContext } from "react";
//import { Link } from "react-router-dom";
import { CRMContext } from "../../../Context/CRMContext";
import YourMachines from "./YourMachines";
import UserCard from "../UserCard";
import clienteAxios from "../../../Config/axios";
import Swal from "sweetalert2";
import shortid from "shortid";
import jwt from "jsonwebtoken";
import Aos from "aos";
import { Form, Icon, Input, Popup, Button } from "semantic-ui-react";

const Machines = (props) => {
  const [auth] = useContext(CRMContext);
  const [vm, setVm] = useState({});
  const [vms, guardarVms] = useState([]);
  const [loader, setLoader] = useState(false);

  if (!auth.token) {
    props.history.push("/login");
  }
  const validarForm = () => {
    const { nombre, so, ram, vram, hdd, usuarioRdp, passRdp } = vm;
    const valido =
      !nombre || !so || !ram || !vram || !hdd || !usuarioRdp || !passRdp;
    return valido;
  };

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

  const lookMachine = async () => {
    const currentUser = jwt.decode(auth.token);
    if (currentUser == null) {
      //props.history.push("/login");
      //setRedirect(true);
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

  const configureMachine = (e, data) => {
    e.preventDefault();
    setVm({ ...vm, [data.name]: data.value });
  };

  const saveMachine = async (event) => {
    event.preventDefault();
    setLoader(true);
    const { nombre, so, ram, vram, hdd, usuarioRdp, passRdp } = vm;
    let valido =
      !nombre || !so || !ram || !vram || !hdd || !usuarioRdp || !passRdp;
    if (valido) {
      Swal.fire({
        icon: "warning",
        text: "Todos los campos son obligatorios.",
      });
      setLoader(false);
    } else {
      const currentUser = jwt.decode(auth.token);
      if (!currentUser) {
        props.history.push("/login");
      } else {
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
              setLoader(false);
              setVm({ nombre: "" });
            });
        } catch (error) {
          Swal.fire({
            icon: "error",
            text: error,
          });
          setLoader(false);
        }
      }
    }
  };
  useEffect(() => {
    lookMachine(); // eslint-disable-next-line react-hooks/exhaustive-deps
    Aos.init({ duration: 700 }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token]); // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div className="contenedor">
      <div className="data-form">
        <UserCard />
        <Form className="form-content">
          <Form.Group widths="equal">
            <Form.Field className="fix-options">
              <label>Nombra tu maquina: </label>
              <Input
                name="nombre"
                placeholder="Machine X"
                value={vm.nombre || ""}
                onChange={configureMachine}
              />
            </Form.Field>
            <Form.Field>
              <label>Sistema Operativo:</label>
              <Form.Select
                name="so"
                className="fix-options"
                options={options_so}
                placeholder="-Seleccionar-"
                value={vm.so || ""}
                onChange={configureMachine}
              />
            </Form.Field>
            <Form.Field>
              <label>Almacenamiento HDD:</label>
              <Form.Select
                name="hdd"
                className="fix-options"
                options={options_hdd}
                placeholder="GB"
                value={vm.hdd || ""}
                onChange={configureMachine}
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
                value={vm.ram || ""}
                onChange={configureMachine}
                options={options_ram}
              ></Form.Select>
            </Form.Field>
            <Form.Field>
              <label>Memoria VRam:</label>
              <Form.Select
                name="vram"
                className="fix-options"
                placeholder="MB"
                options={options_vram}
                value={vm.vram || ""}
                onChange={configureMachine}
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
                name="usuarioRdp"
                type="text"
                value={vm.usuarioRdp || ""}
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
                name="passRdp"
                type="password"
                value={vm.passRdp || ""}
                onChange={configureMachine}
              />
            </Form.Field>
          </Form.Group>
          <Button
            type="submit"
            size="huge"
            fluid
            color="blue"
            onClick={saveMachine}
            loading={loader}
            disabled={validarForm()}
          >
            <Icon name="plus circle" />
            Crear
          </Button>
        </Form>
      </div>
      {!vms.length ? (
        <h4>Aun no tienes ninguna creada, cuando lo hagas apareceran aqui..</h4>
      ) : (
        vms.map((vm) => (
          <YourMachines
            key={vm.id}
            vms={vm}
            lookMachine={lookMachine}
            data-aos="fade-up"
          />
        ))
      )}
    </div>
  );
};

export default Machines;
