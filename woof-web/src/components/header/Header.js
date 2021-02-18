import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";
import AuthContext from "../../contexts/AuthContext";

function NonAuthHeader() {
  return (
    <div className="header">
      <div className="logo">WOOF</div>
      <div className="symbols">123450124254112345012425411234501242541</div>
      <div className="sign-in-out">SIGN IN</div>
    </div>
  );
}

function AuthHeader() {
  const authApi = useContext(AuthContext);
  const history = useHistory();

  function logOut() {
    authApi.setUser();
    history.push("/login");
  }

  return (
    <div className="header">
      <div className="logo">WOOF</div>
      <div className="right-side">
        <div className="symbols-auth">T</div>
        <div className="sign-in-out" onClick={() => logOut()}>
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
