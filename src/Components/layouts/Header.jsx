import React, { useState, useContext, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { CRMContext } from "../../Context/CRMContext";
import jwt from "jsonwebtoken";
import { Segment, Header, Icon } from "semantic-ui-react";

const HeaderComponent = (props) => {
  const [auth, guardarToken] = useContext(CRMContext);
  const [currentUser, setCurrentUser] = useState();
  const logout = () => {
    guardarToken({
      token: "",
      auth: false,
    });
    localStorage.setItem("token", "");
    props.history.push("/");
  };
  useEffect(() => {
    setCurrentUser(jwt.decode(auth.token));
  }, [auth.token]);
  return (
    <div className="contenedor">
      <Segment vertical>
        <Header className="navbar">
          <Header.Content as="h2" className="title">
            <Link to="/">
              <Icon name="cube" />
              MyProyect
              <Header.Subheader>Maquinas Virtuales Gráficas</Header.Subheader>
            </Link>
          </Header.Content>
          <Header.Content as="h3" className="nav">
            {!currentUser ? (
              <>
                <Link to="/products">Productos</Link>
                <Link to="/login">Iniciar Sesión</Link>
                <Link to="/signin">Crear Cuenta</Link>
              </>
            ) : (
              <>
                <Link to="/machines">Maquinas</Link>

                {currentUser.role === "admin" ? (
                  <>
                    <Link to="/usuarios">Usuarios</Link>
                  </>
                ) : (
                  <></>
                )}
                <Link to="/perfil">Pérfil</Link>
                <Link to="/login" onClick={logout}>
                  Cerrar Sesión
                </Link>
              </>
            )}
          </Header.Content>
        </Header>
      </Segment>
    </div>
  );
};

HeaderComponent.propTypes = {
  headerType: PropTypes.string,
};

export default withRouter(HeaderComponent);
