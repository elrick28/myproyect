import React from "react";
import { withRouter } from "react-router-dom";

function NotFound(props) {
    props.history.push('/');
    return (<div></div>);
}
export default withRouter(NotFound);
