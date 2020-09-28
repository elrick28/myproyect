import React, { useState, useContext, useEffect } from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { CRMContext } from "../../Context/CRMContext";
import jwt from "jsonwebtoken";

const UserCard = () => {
  const [auth] = useContext(CRMContext);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    if (auth.auth) {
      setCurrentUser(jwt.decode(auth.token));
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token]);
  return (
    <Card className="fix-card">
      <Image src="/userdefault.jpg" wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          {currentUser ? <> {currentUser.unique_name} </> : <>username</>}
        </Card.Header>
        <Card.Meta>
          {currentUser ? <> {currentUser.role} </> : <>usertype</>}{" "}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Icon name="server" size="large" /> 0/4 maquinas
      </Card.Content>
    </Card>
  );
};
export default UserCard;
