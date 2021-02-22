import firebase from "firebase/app";
import "firebase/auth";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import "./SignUpBox.css";

/**
 * Sign up box
 *
 * contains the logic and components for the user sign up flow
 * connects with firebase to auth users
 */
function SignUpBox() {
  const authApi = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUpClick() {
    // console.log("Attempting Sign Up with:");
    // console.log("Email: ", email);
    // console.log("Password: ", password);

    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        // Signed up, add new user to firestore collection, and sign the user in
        firebase.firestore().collection("users").doc(response.user.uid).set({
          classes: [],
          email: email,
          username: email,
        });
        // Set user to authApi and route to lecture dashboard page
        authApi.setUser(response.user);
        console.log("Current user: ", response.user);
        history.push("/lectureDashboard");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("Error with code: ", errorCode);
        console.log("Error with message: ", errorMessage);
      });
  }

  return (
    <div className="SignUpBox-Container">
      <p className="SignUpBox-WelcomeMsg">
        Enter your email and password below to SIGN UP:
      </p>
      <div className="SignUpBox-InputTable">
        <div className="SignUpBox-InputRow">
          <label className="SignUpBox-InputCell">Email: </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="SignUpBox-InputCell"
            id="signUpBox-EmailInput"
            type="text"
            value={email}
          />
        </div>
        <div className="SignUpBox-InputRow">
          <label className="SignUpBox-InputCell">Password: </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="SignUpBox-InputCell"
            id="signUpBox-PasswordInput"
            type="password"
            value={password}
          ></input>
        </div>
      </div>
      <div className="SignUpBox-InputRow">
        <button
          className="SignUpBox-SignUpButton"
          onClick={() => signUpClick()}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignUpBox;
