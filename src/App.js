import React, { useContext, Suspense, lazy } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
//Context
import { CRMContext, CRMProvider } from "./Context/CRMContext";
import Spinner from "./Components/layouts/Spinner";

function App() {
  const Header = lazy(() => import('./Components/layouts/Header'));
  const Home = lazy(() => import('./Components/Home/Home'));
  const Login = lazy(() => import('./Components/User/LogIn/Login'));
  const Signup = lazy(() => import('./Components/User/SignUp/Signup'));
  const Comunity = lazy(() => import('./Components/User/Comunity/Comunity'));
  const Machines = lazy(() => import('./Components/User/Machines/Machines'));
  const EditMachine = lazy(() => import('./Components/User/Machines/EditMachine'));
  const NotFound = lazy(() => import('./Components/layouts/NotFound'));
  const [auth, guardarToken] = useContext(CRMContext);

  const history = createBrowserHistory();

  return (
    <Router history={history} >
      <Suspense fallback={<Spinner />}>
        <CRMProvider value={[auth, guardarToken]}>
          <Header />
          <Switch fallback={<Spinner />} >
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signin' component={Signup} />
            <Route exact path='/comunity' component={Comunity} />
            <Route exact path='/machines' component={Machines} />
            <Route exact path="/machines/editar/:vmId" component={EditMachine} />
            <Route component={NotFound} />
          </Switch>
        </CRMProvider>
      </Suspense>
    </Router>
  );
}
export default App;
