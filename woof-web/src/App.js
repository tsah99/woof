import React from "react";
import Routes from "./Routes";
import { withRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes />
    </div>
  );
}

export default withRouter(App);
