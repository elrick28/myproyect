import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Spinner from "./Components/layouts/Spinner";

ReactDOM.render(
  <Suspense fallback={<Spinner />}>
    <App />
  </Suspense>,
  document.getElementById('root')
);
