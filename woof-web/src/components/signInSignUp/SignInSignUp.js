import React, { useState } from "react";
import "./SignInSignUp.css";
import SignInBox from "../signInBox/SignInBox.js";
import SignUpBox from "../signUpBox/SignUpBox.js";

/**
 * Sign in + Sign up component
 *
 * Handles switching between the sign in and sign up functions
 */
function SignInSignUp() {
  const [actionBox, setActionBox] = useState();

  return (
    <div>
      <div className="SignInSignUp-Container">
        <p className="SignInSignUp-WelcomeMsg"> Welcome to Woof </p>
        <div className="SignInSignUp-Clickables">
          <button
            onClick={() => setActionBox("signIn")}
            className="SignInSignUp-Button"
            id="signIn-button"
          >
            Sign in
          </button>
          <button
            onClick={() => setActionBox("signUp")}
            className="SignInSignUp-Button"
            id="signUp-button"
          >
            Sign Up
          </button>
        </div>
      </div>
      {actionBox === "signIn" ? <SignInBox /> : ""}
      {actionBox === "signUp" ? <SignUpBox /> : ""}
    </div>
  );
}

export default SignInSignUp;
