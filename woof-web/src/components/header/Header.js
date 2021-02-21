import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";
import firebase from "firebase/app";
import AuthContext from "../../contexts/AuthContext";

function NonAuthHeader() {
  const history = useHistory();
  function logIn() {
    history.push("/signin");
  }

  function goHome() {
    history.push("/");
  }

  return (
    <div className="header">
      <div className="logo">WOOF</div>
      <div className="home" onClick={goHome}>
        HOME
      </div>
      <div className="symbols">123450124254112345012425411234501242541</div>
      <div className="sign-in-out" onClick={logIn}>
        SIGN IN
      </div>
    </div>
  );
}

function AuthHeader() {
  const authApi = useContext(AuthContext);
  const history = useHistory();

  function logOut() {
    firebase.auth().signOut();
    authApi.setUser();
    history.push("/signin");
  }

  function goHome() {
    history.push("/");
  }

  function goLectureDashboard() {
    history.push("/lectureDashboard");
  }

  return (
    <div className="header">
      <div className="logo">WOOF</div>
      <div className="left-side">
        <div className="home" onClick={goHome}>
          HOME
        </div>
        <div className="home" onClick={goLectureDashboard}>
          DASHBOARD
        </div>
      </div>
      <div className="right-side">
        <div className="symbols-auth">T</div>
        <div className="sign-in-out" onClick={logOut}>
          LOG OUT
        </div>
      </div>
    </div>
  );
}

function Header() {
  const authApi = useContext(AuthContext);

  return authApi.user ? <AuthHeader /> : <NonAuthHeader />;
}

export default Header;
