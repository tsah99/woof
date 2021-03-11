import React from "react";
import "./LandingPage.css";
import { useHistory } from "react-router-dom";

/**
 * Simple landing page
 */
function LandingPage() {
  const history = useHistory();
  function logIn() {
    history.push("/signin");
  }

  return (
    <div className="landing-page">
      <div className="title-landing">Lectures made social,</div>
      <div className="title-landing">whenever you watch</div>
      <div className="subtitle-landing">
        Tap into the knowledge of the class as you watch.
      </div>
      <div className="signup-button" onClick={logIn}>
        SIGN IN / SIGN UP
      </div>
    </div>
  );
}

export default LandingPage;
