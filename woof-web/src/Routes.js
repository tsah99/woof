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
        authApi.user ? <C {...props} /> : <Redirect to="/signin" />
      }
    />
  );
}

function Routes({ appProps }) {
  return (
    <Switch>
      <Route path="/signin" exact component={SignIn} appProps={appProps} />
      <AuthenticatedRoute
        path="/lecture"
        exact
        component={Lecture}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/lectureDashboard"
        exact
        component={Lecture}
        appProps={appProps}
      />
      <Route exact component={LandingPage} appProps={appProps} />
    </Switch>
  );
}

export default Routes;
