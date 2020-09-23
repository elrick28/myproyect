import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import { CRMContext, CRMProvider } from "../../Context/CRMContext";
import Header from "./Header";

const Base = (props) => {
  const [auth, guardarToken] = useContext(CRMContext);
  return (
    <>
      <CRMProvider value={[auth, guardarToken]}>
        <Header />
        <section>{props.children}</section>
      </CRMProvider>
    </>
  );
};

Base.propTypes = {
  children: PropTypes.element,
};

export default Base;
