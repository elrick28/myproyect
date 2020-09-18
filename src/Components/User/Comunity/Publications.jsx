import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

const Publications = ({ publicacion }) => {
  const [like] = useState(0);
  const [likeOn] = useState(false);

  useEffect(() => {
    //likes();
    //userLike(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="publications">
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
      <div className="publication">
        <div className="content">
          <p>{publicacion.username}</p>
          <p>{publicacion.timestamp}</p>
        </div>
        <div className="content">{publicacion.texto}</div>
        <div></div>
        <div className="continue">
          <div className="like">
            <p>{like}</p>
            {!likeOn ? (
              <i className="far fa-thumbs-up"></i>
            ) : (
              <i className="far fa-thumbs-up estatus"></i>
            )}
          </div>
          <div className="coments">
            <p>0</p>
            <i className="far fa-comment-alt"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Publications);
