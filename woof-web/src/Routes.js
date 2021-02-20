import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
import SignIn from "./pages/signIn/SignIn";
import Lecture from "./pages/lecture/Lecture";
import LandingPage from "./pages/landingPage/LandingPage";
import LectureDashboard from "./pages/lectureDashboard/LectureDashboard";
import NotAvailablePage from "./pages/notAvailablePage/NotAvailablePage";

function AuthenticatedRoute({ component: C, ...rest }) {
  const authApi = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (rest.path === "/signin") {
          return !authApi.user ? (
            <SignIn {...props} />
          ) : (
            <Redirect to="/lectureDashboard" />
          );
        } else {
          return authApi.user ? <C {...props} /> : <Redirect to="/signin" />;
        }
      }}
    />
  );
}

function Routes({ appProps }) {
  return (
    <Switch>
      <AuthenticatedRoute
        path="/signin"
        exact
        component={SignIn}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/lecture/:courseId/:videoId"
        exact
        component={Lecture}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/lectureDashboard"
        exact
        component={LectureDashboard}
        appProps={appProps}
      />
      <Route exact component={NotAvailablePage} appProps={appProps} />
    </Switch>
  );
}

export default Routes;
