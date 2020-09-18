import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import clienteAxios from "../../../Config/axios";
import { CRMContext } from "../../../Context/CRMContext";
import Publications from "./Publications";

const Comunity = (props) => {
  const [auth] = useContext(CRMContext);
  const [publicaciones, setPublicaciones] = useState([]);
  const [archivo, guardarArchivo] = useState("");
  const [text, setText] = useState("");
  const [btn] = useState(false);
  const user = jwt.decode(auth.token, "LLAVESECRETA");

  const allPub = () => {
    clienteAxios.get("/Comunity/All").then((resp) => {
      setPublicaciones(resp.data);
    });
  };

  const leerArchivo = (e) => {
    guardarArchivo(e.target.files[0]);
  };

  const upload = () => {
    const realFileBtn = document.getElementById("real-file");
    realFileBtn.click();
  };

  const publicar = async (e) => {
    e.preventDefault();

    const publicacion = {
      username: user.nombre,
      texto: text,
      img: archivo,
      timestamp: Date.now(),
      usuarioId: user.id,
    };

    await clienteAxios.post("/Comunity/Post", publicacion).then((resp) => {
      if (resp.status === 200) {
        setText("");
        guardarArchivo("");
        allPub();
      }
    });
  };
  useEffect(() => {
    allPub();
  }, []);

  return (
    <div className="contenido">
      <div className="disf">
        <div className="disb">
          <div className="create_p">
            <div className="rep">
              <div className="user_info">
                <img src="./user_female.png" alt="user_img"></img>
              </div>
              <p>Level: Moderador</p>
              <div className="rank">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
            <form className="editor">
              <textarea
                name="publication"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="editor_options">
                <div className="estilo-foto" onClick={() => upload()}>
                  <i className="far fa-image"></i>
                  <input
                    type="file"
                    id="real-file"
                    name="imagen"
                    hidden="hidden"
                    onChange={leerArchivo}
                  />
                </div>
                <button type="submit" onClick={publicar} disabled={btn}>
                  Publicar
                </button>
              </div>
            </form>
          </div>
          <div className="big_publications">
            {publicaciones.map((publicacion) => (
              <Publications key={publicacion._id} publicacion={publicacion} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Comunity);
