import React, { useState } from "react";
import "./SignInSignUp.css";
import SignInBox from "../signInBox/SignInBox.js";
import SignUpBox from "../signUpBox/SignUpBox.js";

/**
 * This component houses the functionality for displaying sign in
 * and sign up features.
 */
class SignInSignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actionBox: undefined,
    };
  }

  handleButtonClick(buttonName, event) {
    console.log("Button name:", buttonName);
    console.log("Event", event);
    if (buttonName === "signIn-button") {
      this.setState({ actionBox: "sign in" });
    }
    if (buttonName === "signUp-button") {
      this.setState({ actionBox: "sign up" });
    }
  }

  render() {
    return (
      <div>
        <div className="SignInSignUp-Container">
          <p className="SignInSignUp-WelcomeMsg"> Welcome to Woof </p>
          <div className="SignInSignUp-Clickables">
            <button
              onClick={(e) => this.handleButtonClick("signIn-button", e)}
              className="SignInSignUp-Button"
              id="signIn-button"
            >
              Sign In
            </button>
            <button
              onClick={(e) => this.handleButtonClick("signUp-button", e)}
              className="SignInSignUp-Button"
              id="signUp-button"
            >
              Sign Up
            </button>
          </div>
        </div>
        {this.state.actionBox === "sign in" ? <SignInBox /> : ""}
        {this.state.actionBox === "sign up" ? <SignUpBox /> : ""}
      </div>
    );
  }
}

export default SignInSignUp;
