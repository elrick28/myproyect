import React from 'react';
import { Router } from 'react-router-dom';
import history from "./history";

//Layouts
import Routes from "./Routes";

const App = () => (
  <Router history={history} >
    <Routes />
  </Router>
)
export default App;
