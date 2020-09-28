import React, { useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Grid, Image, Button, Icon, Table } from "semantic-ui-react";
import { CRMContext } from "../../../Context/CRMContext";
import Swal from "sweetalert2";
import clienteAxios from "../../../Config/axios";

const YourMachines = ({ vms, lookMachine }) => {
  const [auth] = useContext(CRMContext);
  const [loader, setLoader] = useState(false);

  const deleteMachine = async (event) => {
    event.preventDefault();
    setLoader(true);
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
            setLoader(false);
          });
      } else {
        setLoader(false);
      }
    });
  };

  return (
    <div className="contenedor machines">
      <Grid divided>
        <Grid.Column width={3}>
          <Image src={"/windows.png"} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Table celled inverted>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan={2}>
                  Maquina: {vms.nombre}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Sistema Operativo:</Table.Cell>
                <Table.Cell>{vms.so}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Memoria RAM:</Table.Cell>
                <Table.Cell>{vms.ram} MB</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Memoria VRAM:</Table.Cell>
                <Table.Cell>{vms.vram} MB</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Almacenamiento HDD:</Table.Cell>
                <Table.Cell>{vms.hdd} GB</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column width={4}>
          <Table celled inverted>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan={2}>
                  Credenciales RDP
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Usuario:</Table.Cell>
                <Table.Cell>{vms.usuarioRdp}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Contraseña:</Table.Cell>
                <Table.Cell>{vms.passRdp}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Puerto:</Table.Cell>
                <Table.Cell>{vms.port}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column>
          <Button.Group className="fix-btn" vertical size="huge">
            <Button animated color="green">
              <Button.Content hidden>Iniciar</Button.Content>
              <Button.Content visible>
                <Icon name="play circle" />
              </Button.Content>
            </Button>
            <Link to={`/machines/editar/${vms.id}`}>
              <Button animated color="yellow">
                <Button.Content hidden>Editar</Button.Content>
                <Button.Content visible>
                  <Icon name="edit" />
                </Button.Content>
              </Button>
            </Link>
            <Button
              loading={loader}
              animated
              color="red"
              onClick={deleteMachine}
            >
              <Button.Content hidden>Eliminar</Button.Content>
              <Button.Content visible>
                <Icon name="trash" />
              </Button.Content>
            </Button>
          </Button.Group>
        </Grid.Column>
      </Grid>
    </div>
  );
};
export default withRouter(YourMachines);
