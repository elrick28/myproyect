import React, { Suspense, lazy } from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import waitFor from "./Utils/waitFor";
//import { CRMContext, CRMProvider } from "./Context/CRMContext";

//Layouts
import Base from "./Components/layouts/Base";
import Spinner from "./Components/layouts/Spinner";

const Home = lazy(() => import("./Components/Home/Home"));
const Login = lazy(() => import("./Components/User/LogIn/Login"));
const Signup = lazy(() => import("./Components/User/SignUp/Signup"));
const Comunity = lazy(() => import("./Components/User/Comunity/Comunity"));
const Machines = lazy(() => import("./Components/User/Machines/Machines"));
const EditMachine = lazy(() =>
  import("./Components/User/Machines/EditMachine")
);
const Usuarios = lazy(() => import("./Components/User/Admin/Usuarios"));
const UserProfile = lazy(() => import("./Components/User/UserProfile"));

const Routes = ({ location }) => {
  return (
    <>
      <Base>
        <Suspense fallback={<Spinner />}>
          <Switch location={location}>
            <Route exact path="/" component={waitFor(Home)} />
            <Route exact path="/login" component={waitFor(Login)} />
            <Route exact path="/signin" component={waitFor(Signup)} />
            <Route exact path="/comunity" component={waitFor(Comunity)} />
            <Route exact path="/machines" component={waitFor(Machines)} />
            <Route exact path="/usuarios" component={waitFor(Usuarios)} />
            <Route exact path="/perfil" component={waitFor(UserProfile)} />
            <Route
              exact
              path="/machines/editar/:vmId"
              component={waitFor(EditMachine)}
            />
            <Redirect from="**" to="/" />
          </Switch>
        </Suspense>
      </Base>
    </>
  );
};
export default withRouter(Routes);
