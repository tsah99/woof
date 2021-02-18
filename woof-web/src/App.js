import React from "react";
import Routes from "./Routes";
import NavBar from "./components/navBar/NavBar";
import { withRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes />
    </div>
  );
}

export default withRouter(App);
