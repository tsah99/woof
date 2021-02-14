import firebase from "firebase/app";
import "firebase/auth";
import React, { useState } from "react";
import "./SignUpBox.css";

/**
 * This component houses the functionality for signing up
 * new users
 */
class SignUpBox extends React.Component {
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

  handleSignUpClick(event) {
    console.log("Handling sign-up attempt");
    console.log("Email: ", this.state.email);
    console.log("Password: ", this.state.password);
    console.log(event);
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
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
      <div className="SignUpBox-Container">
        <p className="SignUpBox-WelcomeMsg">
          Enter your email and password below to SIGN UP:
        </p>
        <div className="SignUpBox-InputTable">
          <div className="SignUpBox-InputRow">
            <label className="SignUpBox-InputCell">Email: </label>
            <input
              onChange={(e) => this.handleInputChange("email", e)}
              className="SignUpBox-InputCell"
              id="signUpBox-EmailInput"
              type="text"
              value={this.state.email}
            />
          </div>
          <div className="SignUpBox-InputRow">
            <label className="SignUpBox-InputCell">Password: </label>
            <input
              onChange={(e) => this.handleInputChange("password", e)}
              className="SignUpBox-InputCell"
              id="signUpBox-PasswordInput"
              type="password"
              value={this.state.password}
            ></input>
          </div>
        </div>
        <div className="SignUpBox-InputRow">
          <button
            className="SignUpBox-SignUpButton"
            onClick={(e) => this.handleSignUpClick(e)}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

export default SignUpBox;
