import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";
import firebase from "firebase/app";
import AuthContext from "../../contexts/AuthContext";
import SystemContext from "../../contexts/SystemContext";
import NotificationsMenu from "../notificationsMenu/NotificationsMenu.js";
import { clearConfigCache } from "prettier";

/**
 * Non auth header
 *
 * only shown when there is no user logged in
 */
function NonAuthHeader() {
  const systemApi = useContext(SystemContext);

  const history = useHistory();
  function logIn() {
    history.push("/signin");
  }

  function goAbout() {
    history.push("/about");
  }

  function goLanding() {
    history.push("/");
  }

  return (
    <div className="header">
      <div className="header-logo" onClick={goLanding}>
        WOOF
      </div>
      <div className="header-home" onClick={goAbout}>
        ABOUT
      </div>
      <div className="header-symbols">
        123450124254112345012425411234501242541
      </div>
      <div className="header-sign-in-out" onClick={logIn}>
        SIGN IN / UP
      </div>
      <div
        className="header-symbols-lightdark-nonauth"
        onClick={() => systemApi.setDarkMode(!systemApi.darkMode)}
      >
        {systemApi.darkMode ? "K" : "X"}
      </div>
    </div>
  );
}

/**
 * Auth Header
 *
 * only shown when a user is logged in
 */
function AuthHeader() {
  const authApi = useContext(AuthContext);
  const systemApi = useContext(SystemContext);
  const history = useHistory();
  const [displayNotifications, toggleDisplayNotifications] = useState(false);
  const [notificationsList, setNotificationsList] = useState([]);
  const [individualNotifications, setIndividualNotifications] = useState([]);

  function logOut() {
    firebase.auth().signOut();
    authApi.setUser();
    history.push("/signin");
  }

  function goHome() {
    history.push("/");
  }

  function goLectureDashboard() {
    history.push("/lectureDashboard");
  }

  function handleNotificationClick() {
    toggleDisplayNotifications(!displayNotifications);
  }

  let notificationMenuStyle = systemApi.darkMode
    ? "header-notifications-menu header-notifications-menu-dark"
    : "header-notifications-menu header-notifications-menu-light";

  return (
    <div className="header">
      <div className="header-logo">WOOF</div>
      <div className="header-left-side">
        {/* <div className="header-home" onClick={goHome}>
          HOME
        </div> */}
        <div className="header-home" onClick={goLectureDashboard}>
          DASHBOARD
        </div>
      </div>
      <div className="header-right-side">
        <div
          className="header-symbols-auth header-notifications-icon"
          onClick={handleNotificationClick}
        >
          T
        </div>
        {displayNotifications ? (
          <div className={notificationMenuStyle}>{<NotificationsMenu />}</div>
        ) : (
          <></>
        )}
        <div className="header-sign-in-out" onClick={logOut}>
          LOG OUT
        </div>
        <div
          className="header-symbols-lightdark-auth"
          onClick={() => systemApi.setDarkMode(!systemApi.darkMode)}
        >
          {systemApi.darkMode ? "K" : "X"}
        </div>
      </div>
    </div>
  );
}

/**
 * Global header for Woof
 */
function Header() {
  const authApi = useContext(AuthContext);

  return authApi.user ? <AuthHeader /> : <NonAuthHeader />;
}

export default Header;
