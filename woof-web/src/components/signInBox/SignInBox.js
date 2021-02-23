import firebase from "firebase/app";
import "firebase/auth";
import React, { useState, useContext } from "react";
import { confirmAlert } from "react-confirm-alert";
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

  async function signInEmailClick() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        // Signed in
        authApi.setUser(response.user);
        history.push("/lectureDashboard");
      })
      .catch((error) => {
        confirmAlert({
          title: "Error with sign in attempt!",
          message: <>{error.message}</>,
          buttons: [
            {
              label: "Ok",
            },
          ],
        });
      });
  }

  async function signInGoogleClick() {
    console.log("Attempting Google Sign In");
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then((response) => {
        // If user has not signed in with Google before, add their uid info and email to firestore collection
        const usersRef = firebase
          .firestore()
          .collection("users")
          .doc(response.user.uid);
        usersRef.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            firebase
              .firestore()
              .collection("users")
              .doc(response.user.uid)
              .set({
                classes: [],
                email: response.user.email,
                username: response.user.email,
              });
          }
        });

        // Set user to authApi and route to lecture dashboard page
        authApi.setUser(response.user);
        history.push("/lectureDashboard");
      })
      .catch((error) => {
        confirmAlert({
          title: "Error with sign in attempt!",
          message: <>{error.message}</>,
          buttons: [
            {
              label: "Ok",
            },
          ],
        });
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
          className="SignInBox-SignInButton"
          onClick={() => signInEmailClick()}
        >
          Sign In
        </button>
      </div>
      <div className="SignInBox-Method"> Sign in with Google </div>
      <button
        className="SignInBox-SignInButton"
        onClick={() => signInGoogleClick()}
      >
        Google Sign In
      </button>
    </div>
  );
}

export default SignInBox;
