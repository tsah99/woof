import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import "firebase/firestore";
import "firebase/auth";
import { AuthProvider } from "./contexts/AuthContext";
import { SystemProvider } from "./contexts/SystemContext";
import { VideoProgressProvider } from "./contexts/VideoProgressContext";
import { BrowserRouter as Router } from "react-router-dom";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// VITAL: this must print "Firebase is connected!" for our application to function.
console.log(
  firebase.apps.length ? "Firebase is connected!" : "Firebase is not connected!"
);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <SystemProvider>
          <VideoProgressProvider>
            <App />
          </VideoProgressProvider>
        </SystemProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// enable hot module replacement
if (module.hot) {
  module.hot.accept();
}
