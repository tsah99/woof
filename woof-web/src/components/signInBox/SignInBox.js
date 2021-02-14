import firebase from "firebase/app";
import "firebase/auth";
import React, { useState } from "react";
import "./SignInBox.css";

/**
 * This component houses the functionality for signing in
 * returning users
 */
class SignInBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleInputChange(inputId, event) {
    if (inputId === "email") {
      this.setState({ email: event.target.value });
    }
    if (inputId === "password") {
      this.setState({ password: event.target.value });
    }
  }

  handleSignInClick(event) {
    console.log("Handling sign-in attempt");
    console.log("Email: ", this.state.email);
    console.log("Password: ", this.state.password);
    console.log(event);
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("user: ", user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("error code: ", errorCode);
        console.log("errorMessage: ", errorMessage);
      });
  }

  render() {
    return (
      <div className="SignInBox-Container">
        <p className="SignInBox-WelcomeMsg">
          Enter your email and password below to SIGN IN:
        </p>
        <div className="SignInBox-InputTable">
          <div className="SignInBox-InputRow">
            <label className="SignInBox-InputCell">Email: </label>
            <input
              onChange={(e) => this.handleInputChange("email", e)}
              className="SignInBox-InputCell"
              id="signInBox-EmailInput"
              type="text"
              value={this.state.email}
            />
          </div>
          <div className="SignInBox-InputRow">
            <label className="SignInBox-InputCell">Password: </label>
            <input
              onChange={(e) => this.handleInputChange("password", e)}
              className="SignInBox-InputCell"
              id="signInBox-PasswordInput"
              type="password"
              value={this.state.password}
            ></input>
          </div>
        </div>
        <div className="SignInBox-InputRow">
          <button
            className="SignInBox-SignUpButton"
            onClick={(e) => this.handleSignInClick(e)}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }
}

export default SignInBox;
