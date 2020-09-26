import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import { CRMContext, CRMProvider } from "../../Context/CRMContext";
import HeaderComponent from "./Header";
import { Segment, Divider} from "semantic-ui-react";

const Base = (props) => {
  const [auth, guardarToken] = useContext(CRMContext);
  return (
    <>
      <CRMProvider value={[auth, guardarToken]}>
        <HeaderComponent />
        <Divider />
        <Segment vertical>{props.children}</Segment>
      </CRMProvider>
    </>
  );
};

Base.propTypes = {
  children: PropTypes.element,
};

export default Base;
