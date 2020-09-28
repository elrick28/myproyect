import React, { useState, useEffect, useContext } from "react";
import { CRMContext } from "../../../Context/CRMContext";
import jwt from "jsonwebtoken";
import clienteAxios from "../../../Config/axios";
import User from "./User";
import { Table } from "semantic-ui-react";

const Usuarios = (props) => {
  const [auth] = useContext(CRMContext);
  const [currentUser] = useState(jwt.decode(auth.token));
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    console.log("u can search");
    await clienteAxios
      .get("api/usuarios", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          setUsers(resp.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (currentUser === null) {
      props.history.push("/login");
    } else if (currentUser.role !== "admin") {
      props.history.push("/machines");
    } else if (currentUser.role === "admin") {
      getUsers();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="contenedor">
      <Table celled inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Usuario</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Opciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Usuarios;
