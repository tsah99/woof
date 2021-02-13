import React from "react";
import Routes from "./Routes";
import { withRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default withRouter(App);
