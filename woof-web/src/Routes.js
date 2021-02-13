import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
import SignIn from "./pages/signIn/SignIn";
import Lecture from "./pages/lecture/Lecture";
import LandingPage from "./pages/landingPage/LandingPage";

function AuthenticatedRoute({ component: C, ...rest }) {
  const authApi = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        authApi.user ? <C {...props} /> : <Redirect to="/" />
      }
    />
  );
}

function UnauthenticatedRoute({ component: C, ...rest }) {
  const authApi = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        !authApi.user ? <C {...props} /> : <Redirect to="/" />
      }
    />
  );
}

function Routes({ appProps }) {
  return (
    <Switch>
      <Route path="/" exact component={LandingPage} appProps={appProps} />
      <AuthenticatedRoute
        path="/lecture"
        exact
        component={Lecture}
        appProps={appProps}
      />
      <UnauthenticatedRoute
        path="/signin"
        exact
        component={SignIn}
        appProps={appProps}
      />
      <Route component={LandingPage} />
    </Switch>
  );
}

export default Routes;
