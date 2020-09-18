import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CRMContext } from "../../Context/CRMContext";
import jwt from "jsonwebtoken";
import Aos from "aos";
import "aos/dist/aos.css";

const Header = (props) => {
  const [auth, guardarToken] = useContext(CRMContext);
  const [user, setCurrentUser] = useState({});
  const [showMenu, setShowMenu] = useState(false);

  const subMenu = (state) => {
    setShowMenu(state);
  };

  const logout = () => {
    guardarToken({
      token: "",
      auth: false,
    });
    localStorage.setItem("token", "");
    props.history.push("/login");
  };

  useEffect(() => {
    const currentUser = jwt.decode(auth.token);
    setCurrentUser(currentUser);
    Aos.init({ duration: 500 }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token]); // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <header className="navbar">
      <Link to="/">
        <div className="logo">
          <img src="./logo_header.png" alt="logo"></img>
          <h1 className="title">MyProyect</h1>
        </div>
      </Link>
      <nav className="nav_links nav_hide">
        <Link to={"/machines"}>Mis Maquinas</Link>
      </nav>
      {!showMenu ? (
        <div className="nav_links" onClick={() => subMenu(true)}>
          {user ? <h4 className="nav_hide">{user.unique_name}</h4> : <></>}
          <img src="./user_male.png" alt="user_image"></img>
          <i className="fas fa-caret-down"></i>
        </div>
      ) : (
        <>
          <div className="nav_links" onClick={() => subMenu(false)}>
            {user ? <h4 className="nav_hide">{user.unique_name}</h4> : <></>}
            <img src="./user_male.png" alt="user_image"></img>
            <i className="fas fa-caret-down seton"></i>
            <div data-aos="zoom-in" className="submenu">
              <div className="links">
                {user ? (
                  <>
                    <Link to="#">Pérfil</Link>
                    <i className="fas fa-user-circle"></i>
                  </>
                ) : (
                  <>
                    <Link to="/login">Iniciar Sesión</Link>
                    <i className="fas fa-user-circle"></i>
                  </>
                )}
              </div>
              {user ? (
                <>
                  <div className="links" onClick={logout}>
                    <h4>Cerrar Sesión</h4>
                    <i className="fas fa-sign-out-alt"></i>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/signin">Crear Cuenta</Link>
                  <i className="fas fa-user-circle"></i>
                </>
              )}
            </div>
          </div>
          <div
            data-aos="zoom-in"
            className="submenu_two"
            onClick={() => subMenu(false)}
          >
            <div className="links">
              <Link to="#">Comunidad</Link>
              <i className="fas fa-users"></i>
            </div>
            <div className="links">
              <Link to="/Machines">Mis Maquinas</Link>
              <i className="fas fa-laptop-code"></i>
            </div>
            <div className="links">
              <Link to="#">Soporte</Link>
              <i className="fas fa-info-circle"></i>
            </div>
            <div className="line_separator"></div>
            <div className="links">
              <Link to="#">Pérfil</Link>
              <i className="fas fa-user-circle"></i>
            </div>
            <div className="links">
              <Link to="#">Cerrar Sesión</Link>
              <i className="fas fa-sign-out-alt"></i>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
