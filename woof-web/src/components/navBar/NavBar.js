import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import "./NavBar.css";

function onSignOutClick() {
  firebase.auth().signOut();
}
function NavBar(props) {
  const authApi = useContext(AuthContext);
  let history = useHistory();

  return (
    <div className="NavBar">
      <span>Woof</span>
      {authApi.user ? (
        <span onClick={onSignOutClick}>Sign Out</span>
      ) : (
        <span> Sign In</span>
      )}
    </div>
  );
}

export default NavBar;
