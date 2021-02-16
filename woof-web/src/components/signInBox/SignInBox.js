import firebase from "firebase/app";
import "firebase/auth";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import "./SignInBox.css";

function SignInBox() {
  const authApi = useContext(AuthContext);
  const history = useHistory();
  const provider = new firebase.auth.GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signInEmailClick() {
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
        // Display the error message below in a popup
      });
  }

  async function signInGoogleClick() {
    console.log("Attempting Google Sign In");
    await firebase.auth().signInWithRedirect(provider);
  }

  /**
   * NOTE -- To access Google Provider's OAuth token, use the following
   * on the newly loaded page
   * [source: https://firebase.google.com/docs/auth/web/google-signin]
   */
  // firebase.auth()
  // .getRedirectResult()
  // .then((result) => {
  //   if (result.credential) {
  //     /** @type {firebase.auth.OAuthCredential} */
  //     var credential = result.credential;

  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     var token = credential.accessToken;
  //   }
  //   // The signed-in user info.
  //   var user = result.user;
  // }).catch((error) => {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // The email of the user's account used.
  //   var email = error.email;
  //   // The firebase.auth.AuthCredential type that was used.
  //   var credential = error.credential;
  // });

  return (
    <div className="SignInBox-Container">
      <p className="SignInBox-WelcomeMsg">
        Sign in using one of the two methods below
      </p>
      <div className="SignInBox-Method"> Sign in with email </div>
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
          onClick={() => signInEmailClick()}
        >
          Sign In
        </button>
      </div>
      <div className="SignInBox-Method"> Sign in with Google </div>
      <button
        className="SignInBox-SignUpButton"
        onClick={() => signInGoogleClick()}
      >
        Google Sign In
      </button>
    </div>
  );
}

export default SignInBox;
