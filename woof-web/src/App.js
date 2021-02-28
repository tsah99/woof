import React, { useContext } from "react";
import Routes from "./Routes";
import { withRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import SystemContext from "./contexts/SystemContext";

function App() {
  const systemApi = useContext(SystemContext);

  let className = "App-dark";
  if (systemApi.darkMode === true) {
    className = "App-light";
  }

  return (
    <div className={className}>
      <Header />
      <Routes />
    </div>
  );
}

export default withRouter(App);
