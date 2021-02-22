import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
import SignIn from "./pages/signIn/SignIn";
import Lecture from "./pages/lecture/Lecture";
import LandingPage from "./pages/landingPage/LandingPage";
import LectureDashboard from "./pages/lectureDashboard/LectureDashboard";
import NotAvailablePage from "./pages/notAvailablePage/NotAvailablePage";

/**
 * Authenticated route
 *
 * Handles the auth portion of accessing a page
 * By wrapping a component or page in an Authenticated route, you are ensuring that a user must
 * be logged in to access
 *
 * @param component - the component or page being accessed
 */
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

/**
 * Handles switching between different routes of our app
 *
 * Every time you add a new page, make sure to add it below or else it will
 * not be accesible by our app
 */
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
      <Route exact path="/" component={LandingPage} appProps={appProps} />
      <Route exact component={NotAvailablePage} appProps={appProps} />
    </Switch>
  );
}

export default Routes;
