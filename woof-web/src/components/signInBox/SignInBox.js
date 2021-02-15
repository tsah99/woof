import firebase from "firebase/app";
import "firebase/auth";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import "./SignInBox.css";

function SignInBox() {
  const authApi = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signInClick() {
    console.log("Attempting Sign In with:");
    console.log("Email: ", email);
    console.log("Password: ", password);

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        // Signed in
        authApi.setUser(response.user);
        console.log("Current user: ", response.user);
        history.push("/lecture");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("Error with code: ", errorCode);
        console.log("Error with message: ", errorMessage);
      });
  }

  return (
    <div className="SignInBox-Container">
      <p className="SignInBox-WelcomeMsg">
        Enter your email and password below to SIGN IN:
      </p>
      <div className="SignInBox-InputTable">
        <div className="SignInBox-InputRow">
          <label className="SignInBox-InputCell">Email: </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="SignInBox-InputCell"
            id="signInBox-EmailInput"
            type="text"
            value={email}
          />
        </div>
        <div className="SignInBox-InputRow">
          <label className="SignInBox-InputCell">Password: </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="SignInBox-InputCell"
            id="signInBox-PasswordInput"
            type="password"
            value={password}
          ></input>
        </div>
      </div>
      <div className="SignInBox-InputRow">
        <button
          className="SignInBox-SignUpButton"
          onClick={() => signInClick()}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignInBox;
