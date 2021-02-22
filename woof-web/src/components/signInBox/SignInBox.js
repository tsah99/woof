import firebase from "firebase/app";
import "firebase/auth";
import React, { useState, useContext } from "react";
// import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import "./SignInBox.css";

/**
 * Sign in with email/password combo or with Google
 * [Note, redirect from google sign in still needs work, currently
 * you have to sign in with Google and then click sign in with Google button
 * again in order to sign in]
 */
function SignInBox() {
  const authApi = useContext(AuthContext);
  const history = useHistory();
  const provider = new firebase.auth.GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loginFailed, setLoginFailed] = useState(false);

  async function signInEmailClick() {
    console.log("Attempting Sign In with:");
    console.log("Email: ", email);
    console.log("Password: ", password);

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // Signed in
        authApi.setUser(result.user);
        console.log("Current user: ", result.user);
        history.push("/lectureDashboard");
      })
      .catch((error) => {
        console.log("Error with code: ", error.code);
        console.log("Error with message: ", error.message);
        // Display the error message below in a popup
        // setLoginFailed(!loginFailed);
      });
  }

  async function signInGoogleClick() {
    console.log("Attempting Google Sign In");
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        authApi.setUser(result.user);
        console.log("Current user: ", result.user);
        history.push("/lectureDashboard");
      })
      .catch((error) => {
        console.log("Error with code: ", error.code);
        console.log("Error with message: ", error.message);
      });
  }

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
      {/* {loginFailed ? (
        <Modal show={loginFailed} onHide={setLoginFailed}>
          <Modal.Title>{"Sign In Error"}</Modal.Title>
          <Modal.Body>
            {
              "The login credentials you entered were invalid. Try again, or sign up with a new account."
            }
          </Modal.Body>
          {console.log("yes")}
        </Modal>
      ) : (
        <div></div>
      )} */}
    </div>
  );
}

export default SignInBox;
